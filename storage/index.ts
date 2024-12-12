import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageKey =
  | "accessToken"
  | "refreshToken"
  | "user"
  | "settings"
  | "theme";

class storage {
  static async set(key: StorageKey, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  static async setObject(key: StorageKey, value: object): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  static async get(key: StorageKey): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      throw error;
    }
  }

  static async getObject(key: StorageKey): Promise<object | null> {
    try {
      const value = await this.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      throw error;
    }
  }

  static async remove(key: StorageKey): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }

  static async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error("Error getting all keys:", error);
      throw error;
    }
  }

  static async getToken(): Promise<string | null> {
    return await this.get("accessToken");
  }

  static async setToken(token: string): Promise<void> {
    await this.set("accessToken", token);
  }

  static async getRefreshToken(): Promise<string | null> {
    return await this.get("refreshToken");
  }

  static async setRefreshToken(token: string): Promise<void> {
    await this.set("refreshToken", token);
  }

  static async getUser(): Promise<any | null> {
    return await this.getObject("user");
  }

  static async setUser(user: any): Promise<void> {
    await this.setObject("user", user);
  }

  static async removeUser(): Promise<void> {
    await this.remove("user");
  }

  static async getSettings(): Promise<any | null> {
    return await this.getObject("settings");
  }

  static async setSettings(settings: any): Promise<void> {
    await this.setObject("settings", settings);
  }
}

export default storage;
