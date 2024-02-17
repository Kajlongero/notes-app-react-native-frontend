import { NavbarTop } from "../components/NavbarTop";
import { CategoriesContainer } from "../containers/CategoriesContainer";
import { NotesContainer } from "../containers/NotesContainer";
import { useGet } from "../hooks/useGet";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useEffect, useState } from "react";
import {
  API_ALL_CATEGORIES,
  API_DELETE_CATEGORY,
  API_DELETE_NOTES,
  API_DELETE_PROFILE,
  API_GET_NOTES_BY_CATEGORY,
} from "../utils/APIs";
import { FloatingButton } from "../components/FloatingButton";
import { Menu, Modal, PaperProvider, Portal } from "react-native-paper";
import { AddNewCategory } from "../components/AddNewCategory";
import { StyleSheet, View } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useFetch } from "../hooks/useFetch";
import { MenuComponent } from "../components/MenuComponent";

export const Home = ({ navigation }) => {
  const noteToDelete = useGlobalStore((s) => s.noteToDelete);
  const categoryToDelete = useGlobalStore((s) => s.categoryToDelete);

  const {
    loading: loadingCat,
    error: errorCat,
    handleGet: handleGetCat,
  } = useGet();

  const {
    loading: loadingNotes,
    error: errorNotes,
    changeLoading: changeLoadingNotes,
    handleGet: handleGetNotes,
  } = useGet();

  const {
    loading: loadingDeleteCategory,
    error: errorDeleteCategory,
    handleFetch: fetchDeleteCategory,
  } = useFetch(`${API_DELETE_CATEGORY}${categoryToDelete}`);

  const {
    loading: loadingDeleteNote,
    error: errorDeleteNote,
    handleFetch: fetchDeleteNote,
  } = useFetch(`${API_DELETE_NOTES}${noteToDelete}`);

  const {
    loading: loadingDelete,
    error: errorDelete,
    handleFetch: fetchDeleteAccount,
  } = useFetch(API_DELETE_PROFILE);

  const { removeItem } = useAsyncStorage("token");

  // notes
  const notes = useGlobalStore((s) => s.notes);
  const selectedNotes = useGlobalStore((s) => s.notesSelected);
  const fullfillNotes = useGlobalStore((s) => s.handleFullfillForSelected);
  const changeDeleteNote = useGlobalStore((s) => s.handleDeleteNote);

  // categories
  const categories = useGlobalStore((s) => s.categories);
  const selectedCategory = useGlobalStore((s) => s.selectedCategory);
  const fullfillCategories = useGlobalStore((s) => s.handleFullfillCategories);
  const changeDeleteCategory = useGlobalStore((s) => s.handleDeleteCategory);

  // toggles
  const handleChangeSelected = useGlobalStore((s) => s.handleChangeSelected);
  const handleSelectCategory = useGlobalStore((s) => s.handleSelectCategory);
  const toggleMenu = useGlobalStore((s) => s.toggleHomeMenu);
  const toggleModalDeleteNote = useGlobalStore((s) => s.toggleDeleteNote);
  const toggleModalDeleteCategory = useGlobalStore(
    (s) => s.toggleDeleteCategory
  );
  const toggleModalDeleteAccount = useGlobalStore((s) => s.toggleDeleteAccount);

  // booleans
  const menuVisible = useGlobalStore((s) => s.homeMenu);
  const deleteAccountVisible = useGlobalStore((s) => s.deleteAccount);
  const deleteCategoryVisible = useGlobalStore((s) => s.deleteCategory);
  const deleteNoteVisible = useGlobalStore((s) => s.deleteNote);

  // cleaners
  const clearStore = useGlobalStore((s) => s.clearStore);

  // first render function
  const firstCharge = async () => {
    const categoriesResult = await handleGetCat(API_ALL_CATEGORIES);
    if (!categoriesResult.data.length) return changeLoadingNotes();

    const firstData = await categoriesResult.data[0].id;

    fullfillCategories(categoriesResult);

    const notesResult = await handleGetNotes(
      `${API_GET_NOTES_BY_CATEGORY}${firstData}`
    );
    fullfillNotes(notesResult);

    handleSelectCategory(categoriesResult.data[0].id);
    console.log(categories);
  };

  // when another category is selected, it will ask if the store has data from this cat
  // if true, then we only change, if false, we will call the API to fetch them
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

  // function to delete category
  const handleDeleteCategory = async () => {
    await fetchDeleteCategory("DELETE");

    changeDeleteCategory(categoryToDelete);
    toggleModalDeleteCategory();
  };

  // function to delete note
  const handleDeleteNote = async () => {
    await fetchDeleteNote("DELETE");

    changeDeleteNote(noteToDelete);
    toggleModalDeleteNote();
  };

  // function to delete account
  const handleDeleteAccount = async () => {
    await fetchDeleteAccount("DELETE");

    await removeItem();
    clearStore();
  };

  // function to clean the token and the stores
  const handleLogout = async () => {
    await removeItem();
    clearStore();
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
            iconColor: "red",
            loading: false,
            action: () => navigation.navigate("Favorites"),
          },
          {
            icon: "dots-vertical",
            iconColor: "#fff",
            loading: false,
            action: () => toggleMenu(),
          },
        ]}
      />
      <FloatingButton
        visible={categories.data.length}
        action={() => {
          if (!categories.data.length) return;
          navigation.navigate("New Note", {
            create: { categoryId: selectedCategory },
          });
        }}
        icon="pencil-plus"
        label="Add note"
        iconColor="#fff"
      />
      <MenuComponent
        visible={menuVisible}
        dismiss={toggleMenu}
        posX={368}
        posY={96}
        items={[
          {
            title: "Logout",
            leadingIcon: "logout",
            rippleColor: "#6a6a6a",
            action: handleLogout,
          },
          {
            title: "Delete account",
            leadingIcon: "account-minus",
            rippleColor: "#6a6a6a",
            action: () => {
              toggleMenu();
              toggleModalDeleteAccount();
            },
          },
        ]}
      />
      <ConfirmationModal
        visible={deleteAccountVisible}
        toggleConfirmDelete={() => toggleModalDeleteAccount()}
        cancelAction={() => toggleModalDeleteAccount()}
        confirmAction={handleDeleteAccount}
        title="Are you sure you want to delete your account?"
        icon="alert"
        iconSize={48}
        iconColor="#7c25b0"
        loading={loadingDelete}
      />
      <ConfirmationModal
        title="Are you sure you want to delete this note?"
        visible={deleteNoteVisible}
        icon="alert"
        iconSize={48}
        iconColor="#7c25b0"
        cancelAction={() => toggleModalDeleteNote()}
        toggleConfirmDelete={() => toggleModalDeleteNote()}
        confirmAction={handleDeleteNote}
        loading={loadingDeleteNote}
      />
      <ConfirmationModal
        title="Are you sure you want to delete this category?"
        visible={deleteCategoryVisible}
        icon="alert"
        iconSize={48}
        iconColor="#7c25b0"
        cancelAction={() => toggleModalDeleteCategory()}
        toggleConfirmDelete={() => toggleModalDeleteCategory()}
        confirmAction={handleDeleteCategory}
        loading={loadingDeleteCategory}
      />
      <CategoriesContainer
        data={categories.data}
        loading={loadingCat}
        blocked={loadingNotes}
      />
      <NotesContainer
        data={
          selectedNotes.data && !selectedNotes.data.length
            ? []
            : selectedNotes.data
        }
        loading={loadingNotes}
      />
      <AddNewCategory />
    </PaperProvider>
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
  },
});
