import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useGlobalStore } from "../stores/useGlobalStore";
import { NavbarTop } from "../components/NavbarTop";
import { usePost } from "../hooks/usePost";
import SelectDropdown from "react-native-select-dropdown";
import { API_CREATE_NOTES, API_UPDATE_NOTES } from "../utils/APIs";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { useFetch } from "../hooks/useFetch";

const priorities = [
  { id: 1, name: "LOW" },
  { id: 2, name: "MEDIUM" },
  { id: 3, name: "HIGH" },
  { id: 4, name: "VERY HIGH" },
  { id: 5, name: "IMPORTANT" },
];

export const EditNote = ({ navigation, route }) => {
  const {
    id,
    title: noteTitle,
    description: noteDescription,
    priorityId: notePriorityId,
    isFavorite: noteFavorite,
  } = route.params;

  const [title, setTitle] = useState(noteTitle);
  const [description, setDescription] = useState(noteDescription);
  const [priorityId, setPriorityId] = useState(notePriorityId);
  const [isFavorite, setIsFavorite] = useState(noteFavorite);

  const [titleHeight, setTitleHeight] = useState(38);
  const [descriptionHeight, setDescriptionHeight] = useState(28);

  const handleUpdateNote = useGlobalStore((s) => s.handleUpdateNote);
  const handleAddFavorites = useGlobalStore((s) => s.handleAddFavorites);
  const handleRemoveFromFavorites = useGlobalStore(
    (s) => s.handleRemoveFromFavorites
  );

  const { loading, error, handleFetch } = useFetch(`${API_UPDATE_NOTES}${id}`);

  const updateNote = async () => {
    if (!title) return alert("You can not create a empty title note");
    if (!description) return alert("You must give a description for the note");
    if (!priorityId) return alert("You should select a priority for the note");

    const obj = {
      title,
      description,
      priorityId,
      isFavorite,
    };

    const res = await handleFetch("PATCH", obj);

    handleUpdateNote(res);
    res.isFavorite ? handleAddFavorites(res) : handleRemoveFromFavorites(res);
  };

  return (
    <>
      <NavbarTop
        backgroundColor="#0a0a0a"
        actionArrow={() => navigation.navigate("Home")}
        title=" "
        rightActions={[
          {
            icon: isFavorite ? "heart" : "heart-outline",
            iconColor: isFavorite ? "red" : "white",
            action: () => setIsFavorite(!isFavorite),
          },
          {
            icon: "check",
            action: updateNote,
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
          value={title}
          onChangeText={(t) => setTitle(t)}
          maxLength={120}
        />
        <View style={s.noteDescription}>
          <Text style={{ color: "#666" }}>
            {new Date().toLocaleTimeString()} | {description.length} characters
          </Text>
          <SelectDropdown
            defaultButtonText="Priority"
            defaultValueByIndex={priorityId - 1}
            data={priorities}
            onSelect={(sI, index) => {
              setPriorityId(sI.id);
            }}
            buttonTextAfterSelection={({ name }, index) => {
              return name;
            }}
            rowTextForSelection={({ name }, index) => {
              return name;
            }}
            rowStyle={{
              borderColor: "#1a1a1a",
              padding: 4,
            }}
            selectedRowTextStyle={{
              color: (() => {
                if (priorityId === 1) return s.LOW.borderColor;
                if (priorityId === 2) return s.MEDIUM.borderColor;
                if (priorityId === 3) return s.HIGH.borderColor;
                if (priorityId === 4) return s.VERY_HIGH.borderColor;
                if (priorityId === 5) return s.IMPORTANT.borderColor;
              })(),
            }}
            rowTextStyle={{
              color: "#fff",
              textAlign: "left",
            }}
            buttonStyle={{
              borderColor: "#1a1a1a",
              width: 140,
              backgroundColor: "#1a1a1a1",
              borderColor: (() => {
                if (priorityId === 1) return s.LOW.borderColor;
                if (priorityId === 2) return s.MEDIUM.borderColor;
                if (priorityId === 3) return s.HIGH.borderColor;
                if (priorityId === 4) return s.VERY_HIGH.borderColor;
                if (priorityId === 5) return s.IMPORTANT.borderColor;
              })(),
              borderRadius: 12,
              borderWidth: 1,
            }}
            dropdownStyle={{
              backgroundColor: "#1a1a1a",
              marginTop: 12,
              borderRadius: 8,
            }}
            buttonTextStyle={{
              color: (() => {
                if (priorityId === 1) return s.LOW.borderColor;
                if (priorityId === 2) return s.MEDIUM.borderColor;
                if (priorityId === 3) return s.HIGH.borderColor;
                if (priorityId === 4) return s.VERY_HIGH.borderColor;
                if (priorityId === 5) return s.IMPORTANT.borderColor;
              })(),
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
          onChangeText={(t) => setDescription(t)}
          value={description}
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
  LOW: {
    borderColor: "#00FF00",
  },
  MEDIUM: {
    borderColor: "#FFFF00",
  },
  HIGH: {
    borderColor: "#0000FF",
  },
  VERY_HIGH: {
    borderColor: "#FF0000",
  },
  IMPORTANT: {
    borderColor: "#FFA500",
  },
});
