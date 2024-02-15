import { StyleSheet, View } from "react-native";

export const EmptyCategoryItem = () => {
  return <View style={s.container}></View>;
};

const s = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    borderRadius: 8,
    width: 120,
    height: 36,
    marginRight: 8,
  },
});
