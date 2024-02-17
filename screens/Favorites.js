import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { API_GET_FAVORITES_NOTES } from "../utils/APIs";
import { useGlobalStore } from "../stores/useGlobalStore";
import { NavbarTop } from "../components/NavbarTop";
import { useGet } from "../hooks/useGet";
import { NoteItem } from "../components/NoteItem";
import { EmptyNoteItem } from "../components/EmptyNoteItem";

export const Favorites = ({ navigation }) => {
  const favorites = useGlobalStore((s) => s.favorites);
  const fullfillFavorites = useGlobalStore((s) => s.handleFullfillFavorites);

  const { loading, handleGet } = useGet();

  const firstCharge = async () => {
    if (favorites.alreadyFetched) return;

    const response = await handleGet(API_GET_FAVORITES_NOTES);
    fullfillFavorites(response);
  };

  useEffect(() => {
    firstCharge();
  }, []);

  console.log(favorites.data);

  return (
    <View>
      <NavbarTop
        actionArrow={() => navigation.navigate("Home")}
        actionArrowColor="#fff"
        title=" "
        backgroundColor="#0a0a0a"
      />
      <Text style={s.favText}>Your favorite notes</Text>
      <FlatList
        data={favorites.data}
        renderItem={({ item }) => <NoteItem {...item} />}
      />
    </View>
  );
};

const s = StyleSheet.create({
  favText: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
});
