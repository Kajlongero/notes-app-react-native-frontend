import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";
import { useGlobalStore } from "../stores/useGlobalStore";
import { API_UPDATE_NOTES } from "../utils/APIs";
import { useFetch } from "../hooks/useFetch";

export const NoteItem = (props) => {
  const navigate = useNavigation();

  const { id, title, description, isFavorite, createdAt } = props;
  const deleteCategory = useGlobalStore((state) => state.toggleDeleteCategory);
  const updateNote = useGlobalStore((state) => state.handleUpdateNote);

  const { error, loading, handleFetch } = useFetch(`${API_UPDATE_NOTES}${id}`);

  const handleNavigate = () => {
    navigate.navigate("Edit Note", { ...props });
  };

  const handleAddFavorites = async () => {
    if (!loading) {
      const changeFavorite = await handleFetch("PATCH", {
        isFavorite: !isFavorite,
      });

      updateNote(changeFavorite);
    }
  };

  const handleLongPress = () => {
    console.log("deleted");
  };

  return (
    <View style={s.container} role="listitem">
      <Pressable
        style={s.pressable}
        android_ripple={{ color: "#4a4a4a" }}
        onPress={handleNavigate}
        onLongPress={handleLongPress}
      >
        <View style={s.innerView}>
          <Text style={s.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={s.description} numberOfLines={1} ellipsizeMode="tail">
            {description}
          </Text>
          <View style={s.moreInfo}>
            <Text style={s.created}>
              {new Date(createdAt).toLocaleDateString()}
              {"  "}
              {new Date(createdAt).toLocaleTimeString()}
            </Text>
            <Pressable style={s.favorite} onPress={handleAddFavorites}>
              {!loading ? (
                <Icon
                  size={28}
                  color={isFavorite ? "red" : "white"}
                  source={isFavorite ? "heart" : "heart-outline"}
                />
              ) : (
                <ActivityIndicator animating color="#7c25b0" size={28} />
              )}
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const s = StyleSheet.create({
  container: {},
  pressable: {
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  innerView: {},
  title: {
    color: "#fff",
    overflow: "hidden",
    letterSpacing: 0.5,
    marginBottom: 4,
    fontSize: 21,
    fontWeight: "600",
  },
  description: {
    color: "#fff",
    overflow: "hidden",
    letterSpacing: 1,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "400",
  },
  moreInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  created: {
    color: "#777",
    fontSize: 13,
  },
  favorite: {
    zIndex: 1,
  },
});
