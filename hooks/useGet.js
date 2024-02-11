import { useEffect, useState } from "react";
import { axiosInstance as axios } from "../utils/axiosInstance";
import { storage } from "../utils/mmkvStorage";

export const useGet = (API, store) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    err: false,
    statusCode: null,
    message: "",
  });

  const handleGet = async () => {
    setError({ err: false, message: "", statusCode: null });
    setLoading(true);

    axios
      .get(API, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storage.getString("token")}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        store(data.data);
      })
      .catch(({ response }) => {
        return setError({
          err: true,
          message: response.data.message,
          statusCode: response.status,
        });
      });

    setError({ err: false, message: "", statusCode: null });
    setLoading(false);
  };

  useEffect(() => {
    handleGet();
  }, [API]);

  return {
    handleGet,
    loading,
    error,
  };
};
