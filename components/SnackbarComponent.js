import { Snackbar } from "react-native-paper";

export const SnackbarComponent = ({
  visible,
  dismiss,
  message,
  label,
  action,
}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={dismiss}
      action={{
        label: label,
        onPress: () => action(),
      }}
    >
      {message}
    </Snackbar>
  );
};
