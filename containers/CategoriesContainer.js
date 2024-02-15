import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { CategoryItem } from "../components/CategoryItem";
import { EmptyCategories } from "../components/EmptyCategories";
import { EmptyCategoryItem } from "../components/EmptyCategoryItem";
import { randomKey } from "../utils/randomKey";
import { useGlobalStore } from "../stores/useGlobalStore";

export const CategoriesContainer = ({ data, loading }) => {
  const newCategory = useGlobalStore((s) => s.toggleNewCategory);

  return (
    <>
      {!loading && (
        <Text
          style={{
            fontSize: 14,
            color: "#555",
            paddingHorizontal: 16,
            paddingBottom: 4,
          }}
        >
          Categories
        </Text>
      )}
      <View style={s.container}>
        <FlatList
          horizontal
          data={!loading ? data : [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
          keyExtractor={(item, index) => (loading ? item : item.id)}
          ListEmptyComponent={!loading && <EmptyCategories />}
          renderItem={({ item }, index) =>
            !loading ? (
              <CategoryItem id={item.id} name={item.name} />
            ) : (
              <EmptyCategoryItem
                key={`ghost-child-categories-${randomKey()}`}
              />
            )
          }
        />
        <Pressable
          style={s.pressableIcon}
          android_ripple={{ color: "#777" }}
          onPress={() => newCategory()}
        >
          <Icon source="folder-plus" size={28} color="#7c25b0" />
        </Pressable>
      </View>
    </>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  pressableIcon: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 16,
  },
});
