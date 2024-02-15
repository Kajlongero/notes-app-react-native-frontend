import { useState } from "react";
import { axiosInstance as axios } from "../utils/axiosInstance";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const useGet = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    err: false,
    statusCode: null,
    message: "",
  });
  const { getItem } = useAsyncStorage("token");

  const handleGet = async (API) => {
    setLoading(true);
    setError({ err: false, message: "", statusCode: null });

    const token = await getItem();
    const results = await axios
      .get(API, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setError({ err: false, message: "", statusCode: null });
        setLoading(false);

        return data.data;
      })
      .catch(({ response }) => {
        setLoading(false);
        return setError({
          err: true,
          message: response.data.message,
          statusCode: response.status,
        });
      });

    return results;
  };

  return {
    handleGet,
    loading,
    error,
  };
};
