import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export const FloatingButton = ({
  icon,
  iconColor,
  label,
  rippleColor,
  mode,
  size,
  variant,
  action,
  visible,
}) => {
  return (
    <FAB
      visible={visible}
      label={label}
      icon={icon}
      color={iconColor ?? "#fff"}
      rippleColor={rippleColor ?? "#444"}
      customSize={size ?? 72}
      mode={mode ?? "elevated"}
      variant={variant ?? "surface"}
      onPress={action}
      style={s.fab}
    />
  );
};

const s = StyleSheet.create({
  fab: {
    position: "absolute",
    marginBottom: 48,
    marginRight: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#3a3a3a",
    zIndex: 2,
  },
});
