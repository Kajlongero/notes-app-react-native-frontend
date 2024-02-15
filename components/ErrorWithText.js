import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export const ErrorWithText = ({ title, icon, iconColor, iconSize }) => {
  return (
    <View style={s.container}>
      <Icon source={icon} color={iconColor ?? "#fff"} size={iconSize ?? 20} />
      <Text style={s.text}>{title}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  text: {
    color: "red",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
