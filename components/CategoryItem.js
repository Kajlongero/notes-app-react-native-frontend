import { Pressable, StyleSheet, Text, View } from "react-native";
import { useGlobalStore } from "../stores/useGlobalStore";

export const CategoryItem = ({ id, name }) => {
  const selected = useGlobalStore((state) => state.selectedCategory);
  const handleSelectCategory = useGlobalStore(
    (state) => state.handleSelectCategory
  );
  const toggleDeleteCategory = useGlobalStore(
    (state) => state.toggleDeleteCategory
  );

  const handlePress = () => {
    handleSelectCategory(id);
  };

  const handleOnLongPress = () => {
    toggleDeleteCategory();
  };

  return (
    <View style={s.container}>
      <Pressable
        style={selected === id ? s.selectedCategory : s.pressable}
        onPress={handlePress}
        onLongPress={handleOnLongPress}
        android_ripple={{ color: "#777" }}
      >
        <View style={s.innerContainer}>
          <Text style={selected === id ? s.selectedText : s.categoryText}>
            {name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
  },
  pressable: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    marginRight: 8,
  },
  innerContainer: {},
  categoryText: {
    color: "#fff",
  },
  selectedCategory: {
    backgroundColor: "#4a4a4a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  selectedText: {
    color: "#fff",
  },
});
