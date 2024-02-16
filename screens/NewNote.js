import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useGlobalStore } from "../stores/useGlobalStore";
import { NavbarTop } from "../components/NavbarTop";
import { axiosInstance } from "../utils/axiosInstance";
import { usePost } from "../hooks/usePost";
import SelectDropdown from "react-native-select-dropdown";
import { ActivityIndicator } from "react-native-paper";
import { API_CREATE_NOTES } from "../utils/APIs";

const priorities = [
  { id: 1, name: "LOW" },
  { id: 2, name: "MEDIUM" },
  { id: 3, name: "HIGH" },
  { id: 4, name: "VERY HIGH" },
  { id: 5, name: "IMPORTANT" },
];

export const NewNote = ({ navigation, route }) => {
  const [titleHeight, setTitleHeight] = useState(38);
  const [descriptionHeight, setDescriptionHeight] = useState(28);

  const selected = useGlobalStore((s) => s.selectedCategory);
  const create = useGlobalStore((s) => s.createNote);
  const updateTitle = useGlobalStore((s) => s.updateCreateNoteTitle);
  const updateDescription = useGlobalStore(
    (s) => s.updateCreateNoteDescription
  );
  const updatePriorityId = useGlobalStore((s) => s.updateCreateNotePriorityId);
  const clearNewNote = useGlobalStore((s) => s.clearNewNote);
  const addNote = useGlobalStore((s) => s.handleAddNote);

  const { loading, error, handlePost } = usePost(API_CREATE_NOTES, addNote);

  const addNewNote = async () => {
    if (!create.title.length && !create.description.length) return;

    const obj = {
      title: create.title,
      description: create.description,
      priorityId: create.priorityId,
      categoryId: create.categoryId,
    };

    const res = await handlePost(obj);
    addNote(res);
    clearNewNote();

    navigation.navigate("Home");
  };

  return (
    <>
      <NavbarTop
        backgroundColor="#0a0a0a"
        actionArrow={() => navigation.navigate("Home")}
        title=" "
        rightActions={[
          {
            icon: "check",
            action: addNewNote,
            loading: loading,
          },
        ]}
      />
      <View style={s.newNote}>
        <TextInput
          multiline
          placeholder="Title"
          style={[s.inputTitle, { height: titleHeight }]}
          autoFocus
          placeholderTextColor="#777"
          onContentSizeChange={(e) =>
            setTitleHeight(e.nativeEvent.contentSize.height)
          }
          value={create.title}
          onChangeText={updateTitle}
          maxLength={120}
        />
        <View style={s.noteDescription}>
          <Text style={{ color: "#666" }}>
            {new Date().toLocaleTimeString()} | {create.description.length}{" "}
            characters
          </Text>
          <SelectDropdown
            defaultButtonText="Priority"
            data={priorities}
            onSelect={(sI, index) => {
              updatePriorityId(sI.id);
            }}
            buttonTextAfterSelection={(sI, index) => {
              return sI.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            rowStyle={{
              borderColor: "#1a1a1a",
              padding: 4,
            }}
            rowTextStyle={{
              color: "#fff",
              textAlign: "left",
            }}
            buttonStyle={{
              borderColor: "#1a1a1a",
              width: 140,
              backgroundColor: "#1a1a1a1",
              borderColor: "#3a3a3a",
              borderRadius: 12,
              borderWidth: 1,
            }}
            dropdownStyle={{
              backgroundColor: "#1a1a1a",
              marginTop: 12,
              borderRadius: 8,
            }}
            buttonTextStyle={{
              color: "#777",
            }}
          />
        </View>
        <TextInput
          multiline
          placeholder="Write something"
          style={[s.inputDescription, { height: descriptionHeight }]}
          placeholderTextColor="#333"
          onContentSizeChange={(e) =>
            setDescriptionHeight(e.nativeEvent.contentSize.height)
          }
          onChangeText={updateDescription}
          value={create.description}
          maxLength={250}
        />
      </View>
    </>
  );
};

const s = StyleSheet.create({
  headerStyles: {
    backgroundColor: "#0a0a0a",
  },
  newNote: {
    paddingHorizontal: 24,
  },
  inputTitle: {
    color: "#fff",
    letterSpacing: 1,
    fontSize: 24,
    minHeight: 38,
  },
  inputDescription: {
    color: "#fff",
    letterSpacing: 1,
    fontSize: 16,
    minHeight: 38,
  },
  noteDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});
