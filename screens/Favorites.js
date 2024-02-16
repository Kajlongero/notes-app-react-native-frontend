import { StyleSheet, Text, View } from "react-native";
import { NavbarTop } from "../components/NavbarTop";
import { useGlobalStore } from "../stores/useGlobalStore";

export const Favorites = ({ navigation }) => {
  const favorites = useGlobalStore((s) => s.favorites);

  return (
    <View>
      <NavbarTop
        actionArrow={() => navigation.navigate("Home")}
        actionArrowColor="#fff"
        title="Home"
        backgroundColor="#0a0a0a"
      />
      <Text style={s.favText}>User favorites</Text>
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
