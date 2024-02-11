import { useState } from "react";
import { axiosInstance as axios } from "../utils/axiosInstance";
import { storage } from "../utils/mmkvStorage";

export const usePost = (API, store) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    err: false,
    statusCode: null,
    message: "",
  });

  const handleAuthPost = async (body) => {
    setError({ err: false, message: "", statusCode: null });
    setLoading(true);

    axios
      .post(API, { ...body }, { data: { ...body } })
      .then(({ data }) => {
        const token = data.data.token;
        storage.set("token", token);
      })
      .catch(({ response }) => {
        setLoading(false);
        if (response.data)
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
  };

  const handlePost = (body) => {
    setLoading(true);
    setError({ err: false, message: "", statusCode: null });

    axios
      .post(API, body, {
        headers: {
          Authorization: `Bearer ${storage.getString("token")}`,
        },
        data: {
          ...body,
        },
      })
      .then(({ data }) => {
        store(data.data);
      })
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
  };

  return {
    handleAuthPost,
    handlePost,
    loading,
    error,
  };
};
