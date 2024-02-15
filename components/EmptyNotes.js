import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export const EmptyNotes = ({ icon, iconColor, size, title }) => {
  return (
    <View style={s.container}>
      <Icon source={icon} color={iconColor} size={size} />
      <Text style={s.text}>{title}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  text: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "monospace",
  },
});
