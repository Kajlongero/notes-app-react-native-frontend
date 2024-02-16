import { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { ActivityIndicator, Icon, Modal, Portal } from "react-native-paper";
import { PrimaryDarkButton } from "./PrimaryDarkButton";
import { usePost } from "../hooks/usePost";
import { API_CREATE_CATEGORY } from "../utils/APIs";
import { useGlobalStore } from "../stores/useGlobalStore";
import { TextInputComponent } from "./TextInputComponent";
import { ErrorWithText } from "./ErrorWithText";

export const AddNewCategory = () => {
  const { loading, error, handlePost } = usePost(API_CREATE_CATEGORY);
  const [name, setName] = useState("");

  const visible = useGlobalStore((s) => s.newCategory);
  const toggleNewCategory = useGlobalStore((s) => s.toggleNewCategory);
  const handleAddCategory = useGlobalStore((s) => s.handleAddCategory);

  const dismiss = () => {
    Keyboard.dismiss();
    setName("");
    toggleNewCategory();
  };

  const handleCreateCategory = async () => {
    if (!loading) {
      const response = await handlePost({ name });

      handleAddCategory(response);
      toggleNewCategory();
      setName("");
    }
  };

  return (
    <Portal>
      <Modal
        style={{
          zIndex: 2,
        }}
        visible={visible}
        onDismiss={() => dismiss()}
        contentContainerStyle={s.modal}
      >
        <View style={s.viewModal}>
          <Text style={s.modalText}>New category</Text>
          <TextInputComponent
            placeholder="New Category..."
            error={error.err}
            backgroundColor="#3a3a3a"
            activeOutlineColor="#7c25b0"
            placeholderTextColor="#777"
            value={name}
            autoFocus={true}
            action={(t) => setName(t)}
          />
          {error.err && (
            <ErrorWithText icon="alert-circle" title={error.message} />
          )}
          {loading && (
            <ActivityIndicator
              animating={true}
              color="#7c25b0"
              size="large"
              style={{
                marginTop: 8,
              }}
            />
          )}
          <View style={s.buttonsContainer}>
            <PrimaryDarkButton
              title="Cancel"
              action={() => dismiss()}
              buttonSize={125}
            />
            <PrimaryDarkButton
              title="Create"
              buttonSize={125}
              action={handleCreateCategory}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const s = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#3a3a3a",
    elevation: 4,
    borderRadius: 12,
    margin: 24,
  },
  viewModal: {
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  modalText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    marginBottom: 16,
  },
  inputModal: {
    color: "#fff",
    backgroundColor: "#4a4a4a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 16,
    borderRadius: 16,
  },
  buttonsContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  inputFocus: {
    borderColor: "#7c25b0",
    borderWidth: 3,
    elevation: 4,
  },
});
