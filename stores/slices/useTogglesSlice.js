const initialState = {
  homeMenu: false,

  newCategory: false,
  editCategory: false,
  deleteCategory: false,

  createNoteMenu: false,
  editNoteMenu: false,
  deleteNote: false,

  deleteAccount: false,
};

export const useTogglesSlice = (setState, get) => ({
  homeMenu: false,

  newCategory: false,
  editCategory: false,
  deleteCategory: false,

  createNoteMenu: false,
  editNoteMenu: false,
  deleteNote: false,

  deleteAccount: false,

  toggleHomeMenu: () => setState((state) => ({ homeMenu: !state.homeMenu })),

  toggleNewCategory: () =>
    setState((state) => ({ newCategory: !state.newCategory })),
  toggleEditCategory: () =>
    setState((state) => ({ editCategory: !state.editCategory })),
  toggleDeleteCategory: () =>
    setState((state) => ({ deleteCategory: !state.deleteCategory })),

  toggleCreateNoteMenu: () =>
    setState((state) => ({ createNoteMenu: !state.createNoteMenu })),
  toggleEditNoteMenu: () =>
    setState((state) => ({ editNoteMenu: !state.editNoteMenu })),
  toggleDeleteNote: () =>
    setState((state) => ({
      deleteNote: !state.deleteNote,
    })),

  toggleDeleteAccount: () =>
    setState((state) => ({ deleteAccount: !state.deleteAccount })),

  clearToggleSlice: () => setState((state) => ({ ...state, ...initialState })),
});
