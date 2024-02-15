import { NavbarTop } from "../components/NavbarTop";
import { CategoriesContainer } from "../containers/CategoriesContainer";
import { NotesContainer } from "../containers/NotesContainer";
import { useGet } from "../hooks/useGet";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useEffect, useState } from "react";
import {
  API_ALL_CATEGORIES,
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

export const Home = ({ navigation }) => {
  const {
    loading: loadingCat,
    error: errorCat,
    handleGet: handleGetCat,
  } = useGet();

  const {
    loading: loadingNotes,
    error: errorNotes,
    handleGet: handleGetNotes,
  } = useGet();

  const {
    loading: loadingDelete,
    error: errorDelete,
    handleFetch: handleDeleteProfile,
  } = useFetch(API_DELETE_PROFILE);

  const [offsets, setOffsets] = useState({
    notes: 0,
    categories: 0,
  });

  const { removeItem } = useAsyncStorage("token");

  const notes = useGlobalStore((s) => s.notes);
  const selectedNotes = useGlobalStore((s) => s.notesSelected);
  const categories = useGlobalStore((s) => s.categories);
  const selectedCategory = useGlobalStore((s) => s.selectedCategory);
  const handleChangeSelected = useGlobalStore((s) => s.handleChangeSelected);
  const handleSelectCategory = useGlobalStore((s) => s.handleSelectCategory);
  const fullfillCategories = useGlobalStore((s) => s.handleFullfillCategories);
  const fullfillNotes = useGlobalStore((s) => s.handleFullfillForSelected);

  const clearStore = useGlobalStore((s) => s.clearStore);

  const visible = useGlobalStore((s) => s.homeMenu);
  const confirmDelete = useGlobalStore((s) => s.confirmDelete);

  const toggleMenu = useGlobalStore((s) => s.toggleHomeMenu);
  const toggleConfirmDelete = useGlobalStore((s) => s.toggleConfirmDelete);

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

  const handleLogout = async () => {
    await removeItem();
    clearStore();
  };

  const handleDeleteAccount = async () => {
    await handleDeleteProfile("DELETE");

    if (!errorDelete.error) {
      // await removeItem();
      // clearStore();
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
            action: () => toggleMenu(),
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
      <View style={s.menu}>
        <Menu
          visible={visible}
          onDismiss={() => toggleMenu()}
          anchor={{
            x: 2000,
            y: 96,
          }}
          contentStyle={{
            backgroundColor: "#1a1a1a",
          }}
          anchorPosition="top"
          elevation={2}
          theme={{}}
        >
          <Menu.Item
            title="Logout"
            theme="light"
            leadingIcon="logout"
            titleStyle={{
              color: "#fff",
            }}
            rippleColor="#6a6a6a"
            onPress={handleLogout}
          ></Menu.Item>
          <Menu.Item
            title="Delete account"
            theme="dark"
            rippleColor="#6a6a6a"
            leadingIcon="account-cancel-outline"
            titleStyle={{
              color: "#fff",
            }}
            onPress={() => {
              toggleMenu();
              toggleConfirmDelete();
            }}
          ></Menu.Item>
        </Menu>
      </View>
      <ConfirmationModal
        visible={confirmDelete}
        toggleConfirmDelete={() => toggleConfirmDelete()}
        cancelAction={() => toggleConfirmDelete()}
        confirmAction={handleDeleteAccount}
        title="Are you sure you want to delete your account?"
        icon="alert"
        iconSize={48}
        iconColor="#FFFF00"
        loading={loadingDelete}
      />
      <CategoriesContainer data={categories.data} loading={loadingCat} />
      <NotesContainer data={selectedNotes.data} loading={loadingNotes} />
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
