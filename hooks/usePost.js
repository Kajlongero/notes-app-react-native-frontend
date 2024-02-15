import { useState } from "react";
import { axiosInstance as axios } from "../utils/axiosInstance";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const usePost = (API) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    err: false,
    statusCode: null,
    message: "",
  });
  const { getItem, setItem } = useAsyncStorage("token");

  const handleAuthPost = async (body, storage) => {
    setLoading(true);
    setError({ err: false, message: "", statusCode: null });

    await axios
      .post(API, { ...body }, { data: { ...body } })
      .then(async ({ data }) => {
        const token = data.data.token;
        await setItem(token);

        storage(true);
        setError({ err: false, message: "", statusCode: null });
      })
      .catch((data) => {
        if (data.response.status === 500) {
          setLoading(false);
          return setError({
            err: true,
            message: "Internal server error, try again later",
            statusCode: 500,
          });
        }
        return setError({
          err: true,
          message: data.response.data.message,
          statusCode: data.response.status,
        });
      });

    setLoading(false);
  };

  const handlePost = async (body) => {
    setLoading(true);
    setError({ err: false, message: "", statusCode: null });

    const token = await getItem();

    const res = await axios
      .post(API, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ...body,
        },
      })
      .then(({ data }) => data.data)
      .catch(({ response }) => {
        setLoading(false);
        if (response.status === 500) {
          return setError({
            err: true,
            message: "Internal server error, try again later",
            statusCode: 500,
          });
        }
        return setError({
          err: true,
          message: response.data.message,
          statusCode: response.status,
        });
      });

    setError({ err: false, message: "", statusCode: null });
    setLoading(false);

    return res;
  };

  const clearError = () =>
    setError({ err: false, message: "", statusCode: null });

  return {
    handleAuthPost,
    handlePost,
    clearError,
    loading,
    error,
  };
};
