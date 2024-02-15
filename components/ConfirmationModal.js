import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Icon, Modal, Portal } from "react-native-paper";
import { PrimaryDarkButton } from "./PrimaryDarkButton";

export const ConfirmationModal = ({
  visible,
  toggleConfirmDelete,
  loading,
  icon,
  iconSize,
  iconColor,
  title,
  cancelAction,
  confirmAction,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => toggleConfirmDelete()}
        contentContainerStyle={s.modal}
      >
        <View style={s.info}>
          <Icon source={icon} size={iconSize} color={iconColor} />
          <Text style={s.modalText}>{title}</Text>
          {loading && (
            <ActivityIndicator animating={true} color="#7c25b0" size={40} />
          )}
        </View>
        <View style={s.buttonsContainer}>
          <PrimaryDarkButton
            title="Cancel"
            action={cancelAction}
            buttonSize={120}
          />
          <PrimaryDarkButton
            title="Confirm"
            action={confirmAction}
            buttonSize={120}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const s = StyleSheet.create({
  modal: {
    margin: 32,
    padding: 16,
    backgroundColor: "#3a3a3a",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  modalText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  buttonsContainer: {
    marginTop: 32,
    flexDirection: "row",
    gap: 16,
  },
});
