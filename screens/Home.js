import { NavbarTop } from "../components/NavbarTop";
import { CategoriesContainer } from "../containers/CategoriesContainer";
import { NotesContainer } from "../containers/NotesContainer";
import { useGet } from "../hooks/useGet";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useEffect, useState } from "react";
import { API_ALL_CATEGORIES, API_GET_NOTES_BY_CATEGORY } from "../utils/APIs";
import { FloatingButton } from "../components/FloatingButton";
import { PaperProvider } from "react-native-paper";
import { AddNewCategory } from "../components/AddNewCategory";

export const Home = ({ navigation }) => {
  const { loading: loadingCat, errorCat, handleGet: handleGetCat } = useGet();
  const {
    loading: loadingNotes,
    errorNotes,
    handleGet: handleGetNotes,
  } = useGet();

  const [offsets, setOffsets] = useState({
    notes: 0,
    categories: 0,
  });

  const notes = useGlobalStore((s) => s.notes);
  const selectedNotes = useGlobalStore((s) => s.notesSelected);
  const categories = useGlobalStore((s) => s.categories);
  const selectedCategory = useGlobalStore((s) => s.selectedCategory);
  const handleChangeSelected = useGlobalStore((s) => s.handleChangeSelected);
  const handleSelectCategory = useGlobalStore((s) => s.handleSelectCategory);
  const fullfillCategories = useGlobalStore((s) => s.handleFullfillCategories);
  const fullfillNotes = useGlobalStore((s) => s.handleFullfillForSelected);

  const firstCharge = async () => {
    const categoriesResult = await handleGetCat(API_ALL_CATEGORIES);
    const firstData = await categoriesResult.data[0].id;

    fullfillCategories(categoriesResult);

    const notesResult = await handleGetNotes(
      `${API_GET_NOTES_BY_CATEGORY}${firstData}`
    );
    fullfillNotes(notesResult);

    handleSelectCategory(categoriesResult.data[0].id);
    console.log(categories);
  };

  const changeCategoryFetch = async () => {
    if (!selectedCategory) return;

    const doesExists = notes.some((n) => n.categoryId === selectedCategory);

    if (doesExists) {
      handleChangeSelected(selectedCategory);
      return;
    }

    if (!doesExists) {
      const notesResult = await handleGetNotes(
        `${API_GET_NOTES_BY_CATEGORY}${selectedCategory}`
      );

      fullfillNotes(notesResult);
    }
  };

  useEffect(() => {
    firstCharge();
  }, []);

  useEffect(() => {
    changeCategoryFetch();
  }, [selectedCategory]);

  return (
    <PaperProvider>
      <NavbarTop
        title="Home"
        titleColor="#fff"
        backgroundColor="#0a0a0a"
        rightActions={[
          {
            icon: "heart",
            iconColor: "#7c25b0",
            loading: false,
            action: () => console.log("okay"),
          },
          {
            icon: "dots-vertical",
            iconColor: "#fff",
            loading: false,
            action: () => console.log("click"),
          },
        ]}
      />
      <FloatingButton
        action={() =>
          navigation.navigate("New Note", {
            create: { categoryId: selectedCategory },
          })
        }
        icon="pencil-plus"
        label="Add note"
        iconColor="#fff"
      />
      <CategoriesContainer data={categories.data} loading={loadingCat} />
      <NotesContainer data={selectedNotes.data} loading={loadingNotes} />
      <AddNewCategory />
    </PaperProvider>
  );
};
