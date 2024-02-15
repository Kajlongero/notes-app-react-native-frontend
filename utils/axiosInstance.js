import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://react-native-notes-app-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeoutErrorMessage: "Connection timeout, try again later",
  timeout: 5000,
});
