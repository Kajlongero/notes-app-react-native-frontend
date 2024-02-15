import { StyleSheet, View } from "react-native";

export const EmptyNoteItem = () => {
  return <View style={s.container}></View>;
};

const s = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "#333",
    height: 120,
  },
});
