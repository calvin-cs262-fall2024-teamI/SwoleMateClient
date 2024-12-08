import React from "react";
import { useContext } from "react";
import { UserContext } from "@/nonapp/UserContext";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("AuthGuard must be used within a UserProvider");
  }

  const { isAuthenticated } = userContext;

  if (isAuthenticated === null) {
    // Show a loading spinner while checking authentication
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
