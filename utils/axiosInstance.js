import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://react-native-notes-app-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  timeoutErrorMessage: "Connection timeout, try again later",
});
