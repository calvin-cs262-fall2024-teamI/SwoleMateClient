// src/auth/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp as signUpService, login as loginService, logout as logoutService, User } from "./authService";

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Use a type assertion to tell TypeScript `AuthContext` will always have a value
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setUser({ id: "", emailAddress: "", username: "", token });
      }
    };
    checkAuthStatus();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    await signUpService(email, password, username);
    setUser({ id: "", emailAddress: email, username });
  };

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginService(email, password);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
