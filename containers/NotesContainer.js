import { FlatList, Text, View } from "react-native";
import { NoteItem } from "../components/NoteItem";
import { EmptyNotes } from "../components/EmptyNotes";
import { EmptyNoteItem } from "../components/EmptyNoteItem";
import { randomKey } from "../utils/randomKey";

export const NotesContainer = ({ data, loading }) => {
  return (
    <View
      style={{
        marginTop: 16,
        flex: 1,
      }}
    >
      {!loading && (
        <Text
          style={{
            color: "#555",
            marginHorizontal: 16,
            marginBottom: 4,
            fontSize: 14,
          }}
        >
          Notes
        </Text>
      )}
      <FlatList
        data={loading ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : data}
        keyExtractor={(item, index) => (loading ? item : item.id)}
        renderItem={({ item }, index) =>
          loading ? (
            <EmptyNoteItem key={`ghost-child-note-${randomKey()}`} />
          ) : (
            <NoteItem {...item} />
          )
        }
        ListEmptyComponent={
          !loading && (
            <EmptyNotes
              icon="emoticon-sad"
              iconColor="#7c25b0"
              size={192}
              title="There is not notes yet"
            />
          )
        }
      />
    </View>
  );
};
