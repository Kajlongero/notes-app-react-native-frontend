import { ActivityIndicator } from "react-native-paper";

export const LoadingSpin = ({ animating, color, size, hides }) => (
  <ActivityIndicator
    animating={animating}
    color={color}
    size={size}
    style={{
      marginTop: 16,
    }}
    hidesWhenStopped={hides}
  />
);
