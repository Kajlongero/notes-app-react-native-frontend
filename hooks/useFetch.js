import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const useFetch = (API) => {
  const { getItem } = useAsyncStorage("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
    statusCode: null,
  });

  const handleFetch = async (method, body) => {
    setLoading(true);
    setError({ error: false, message: "", statusCode: null });

    const token = await getItem();

    const response = await axiosInstance({
      url: `${API}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body ? body : undefined,
      method: `${method.toUpperCase()}`,
    })
      .then(({ data }) => data.data)
      .catch((data) => {
        if (data.response.status === 500) {
          return setError({
            error: true,
            message: "Internal server error",
            statusCode: 500,
          });
        }
        return setError({
          error: true,
          message: data.response.data.message,
          statusCode: data.response.data.statusCode,
        });
      });
    setError({ error: false, message: "", statusCode: null });
    setLoading(false);

    return response;
  };

  const clearError = () => {
    setError({
      error: false,
      message: "",
      statusCode: null,
    });
  };

  return {
    handleFetch,
    clearError,
    loading,
    error,
  };
};
