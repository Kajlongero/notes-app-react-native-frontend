import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export const EmptyCategories = () => {
  return (
    <View style={s.container}>
      <Icon source="alert-circle" color="#fff" size={20} />
      <Text style={s.text}>No categories added, add one</Text>
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
