import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export const EmptyCategories = () => {
  return (
    <View style={s.container}>
      <Icon source="alert-circle" color="#7c25b0" size={20} />
      <Text style={s.text}>
        You must have at least one category to create notes
      </Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: "#2a2a2a",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  text: {
    color: "#fff",
  },
});
