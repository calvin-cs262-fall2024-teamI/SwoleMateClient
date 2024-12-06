import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Define the shape of the user data
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// Define the context type. We only need the userId to access the information
interface UserContextType {
  userId: string | null;
  setUserId: (id: string) => void;
  clearUserId: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the context
export const UserContext = createContext<UserContextType | null>(null);

// Create the provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  useEffect(() => {
    // Check if this is triggering a call at startup
    console.log("User context initialized");
  }, []);
  const [userId, setUserIdState] = useState<string | null>(null);

  const setUserId = async (id: string) => {
    await AsyncStorage.setItem("userId", id);
    setUserIdState(id);
  };

  const clearUserId = async () => {
    await AsyncStorage.removeItem("userId");
    setUserIdState(null);
  };

  const isAuthenticated = Boolean(userId);

  return (
    <UserContext.Provider
      value={{ userId, setUserId, clearUserId, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
