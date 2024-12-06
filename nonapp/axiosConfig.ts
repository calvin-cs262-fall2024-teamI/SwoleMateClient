import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://swolemate-service.azurewebsites.net", // Set your base URL
});

apiClient.interceptors.request.use(config => {
  console.log(`Request made: ${config.url}`);
  return config;
});

export default apiClient;
