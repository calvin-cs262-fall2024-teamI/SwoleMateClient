/**
 * @fileoverview Storage utility class for managing AsyncStorage operations
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/** Valid storage keys for the application */
type StorageKey =
  | "accessToken"
  | "refreshToken"
  | "user"
  | "settings"
  | "theme";

/**
 * Storage class providing methods for AsyncStorage operations
 */
class storage {
  /**
   * Sets a string value in storage
   * @param key - Storage key
   * @param value - String value to store
   */
  static async set(key: StorageKey, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  /**
   * Sets an object value in storage
   * @param key - Storage key
   * @param value - Object to store
   */
  static async setObject(key: StorageKey, value: object): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  /**
   * Gets a string value from storage
   * @param key - Storage key
   * @returns String value from storage
   */
  static async get(key: StorageKey): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      throw error;
    }
  }

  /**
   * Gets an object value from storage
   * @param key - Storage key
   * @returns Object from storage
   */
  static async getObject(key: StorageKey): Promise<object | null> {
    try {
      const value = await this.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      throw error;
    }
  }

  /**
   * Removes a value from storage
   * @param key - Storage key
   */
  static async remove(key: StorageKey): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clears all values from storage
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }

  /**
   * Gets all keys stored in AsyncStorage
   * @returns Array of keys stored in AsyncStorage
   */
  static async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error("Error getting all keys:", error);
      throw error;
    }
  }

  /**
   * Gets the access token from storage
   * @returns Access token from storage
   */
  static async getToken(): Promise<string | null> {
    return await this.get("accessToken");
  }

  /**
   * Sets the access token in storage
   * @param token - Access token to store
   */
  static async setToken(token: string): Promise<void> {
    await this.set("accessToken", token);
  }

  /**
   * Gets the refresh token from storage
   * @returns Refresh token from storage
   */
  static async getRefreshToken(): Promise<string | null> {
    return await this.get("refreshToken");
  }

  /**
   * Sets the refresh token in storage
   * @param token - Refresh token to store
   */
  static async setRefreshToken(token: string): Promise<void> {
    await this.set("refreshToken", token);
  }

  /**
   * Gets the user object from storage
   * @returns User object from storage
   */
  static async getUser(): Promise<any | null> {
    return await this.getObject("user");
  }

  /**
   * Sets the user object in storage
   * @param user - User object to store
   */
  static async setUser(user: any): Promise<void> {
    await this.setObject("user", user);
  }

  /**
   * Removes the user object from storage
   */
  static async removeUser(): Promise<void> {
    await this.remove("user");
  }

  /**
   * Gets the settings object from storage
   * @returns Settings object from storage
   */
  static async getSettings(): Promise<any | null> {
    return await this.getObject("settings");
  }

  /**
   * Sets the settings object in storage
   * @param settings - Settings object to store
   */
  static async setSettings(settings: any): Promise<void> {
    await this.setObject("settings", settings);
  }
}

export default storage;
