import { TextInput } from "react-native-paper";

export const TextInputComponent = ({
  textColor,
  placeholder,
  placeholderTextColor,
  activeOutlineColor,
  hidePassword = false,
  backgroundColor,
  value,
  action,
  iconLeft,
  iconLeftColor,
  iconLeftPress,
  iconRight,
  iconRightColor,
  iconRightPress,
  autoFocus,
  error,
}) => {
  return (
    <TextInput
      mode="outlined"
      textColor={textColor ? textColor : "#fff"}
      placeholder={placeholder}
      placeholderTextColor={
        placeholderTextColor ? placeholderTextColor : "#555"
      }
      activeOutlineColor={activeOutlineColor ? activeOutlineColor : "#7c25b0"}
      value={value}
      onChangeText={action}
      secureTextEntry={hidePassword}
      autoFocus={autoFocus ?? false}
      error={error ?? false}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "#0a0a0a",
        marginBottom: 16,
      }}
      left={
        iconLeft ? (
          <TextInput.Icon
            icon={iconLeft}
            color={iconLeftColor ?? "#fff"}
            onPress={iconLeftPress}
            size={20}
          />
        ) : null
      }
      right={
        iconRight ? (
          <TextInput.Icon
            icon={iconRight}
            color={iconRightColor ?? "#fff"}
            onPress={iconRightPress}
            size={20}
          />
        ) : null
      }
    />
  );
};
