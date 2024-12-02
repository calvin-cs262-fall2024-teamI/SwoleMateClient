import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the user data
interface UserInfo {
  username?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  heightFt?: number;
  heightIn?: number;
  weight?: number;
  preferredTime?: string;
  workoutType?: string;
  experienceLevel?: string;
  personalBio?: string;
  profileImage?: string | null;
}

// Define the context type
interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Create the provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
