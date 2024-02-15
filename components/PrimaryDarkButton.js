import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export const PrimaryDarkButton = ({
  title,
  icon,
  buttonSize,
  iconColor,
  iconSize,
  action,
}) => {
  return (
    <View style={s.button}>
      <Pressable
        style={[
          s.pressable,
          buttonSize ? { width: buttonSize } : { width: 150 },
        ]}
        android_ripple={{ color: "#9f9f9f" }}
        onPress={action}
      >
        <View style={s.textWrapper}>
          {icon && (
            <Icon source={icon} color={iconColor ?? "#fff"} size={iconSize} />
          )}
          <Text style={s.buttonText}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const s = StyleSheet.create({
  button: {
    borderRadius: 20,
    overflow: "hidden",
  },
  pressable: {
    width: 150,
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#4a4a4a",
    borderRadius: 20,
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "monospace",
    fontSize: 18,
  },
});
