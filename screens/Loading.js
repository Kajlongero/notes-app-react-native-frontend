import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LoadingSpin } from "../components/LoadingSpin";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../utils/axiosInstance";
import { API_USER_BY_TOKEN } from "../utils/APIs";

export const Loading = ({ navigation }) => {
  const updateUser = useGlobalStore((state) => state.updateUser);
  const handleAuthSession = useGlobalStore((state) => state.handleAuthSession);

  const { getItem, removeItem } = useAsyncStorage("token");

  const verifyToken = async () => {
    const token = await getItem();
    if (!token) return navigation.replace("Welcome");

    await axiosInstance
      .get(API_USER_BY_TOKEN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        handleAuthSession(true);
      })
      .catch(async ({ response }) => {
        navigation.replace("Welcome");
      });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <View style={s.container}>
      <LoadingSpin animating={true} color="#7c25b0" size={48} />
      <Text style={s.loadingText}>Loading...</Text>
      <Text style={s.title}>Hello and thanks for using our App!</Text>
      <Text style={s.description}>Wait a moment until we load the app!</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 64,
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#777",
    fontSize: 12,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 6,
  },
  title: {
    color: "#fff",
    fontSize: 21,
    letterSpacing: 0.5,
    textAlign: "center",
    marginVertical: 16,
  },
  description: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
  },
});
