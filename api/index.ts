import axios from "axios";

const BACKEND_URL = "http://10.25.14.170:3000/api";

interface LoginCredentials {
  emailAddress: string;
  password: string;
}

export const verifyLogin = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};
