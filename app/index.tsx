import { Redirect } from "expo-router";
import storage from "@/storage";
import { useEffect } from "react";
import { useState } from "react";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await storage.getToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/match" />;
  }

  return <Redirect href="/welcome" />;
}
