export const useTogglesSlice = (setState, get) => ({
  newCategory: false,
  editCategory: false,
  deleteCategory: false,

  homeMenu: false,
  createNoteMenu: false,
  editNoteMenu: false,

  toggleNewCategory: () =>
    setState((state) => ({ newCategory: !state.newCategory })),
  toggleEditCategory: () =>
    setState((state) => ({ editCategory: !state.editCategory })),
  toggleDeleteCategory: () =>
    setState((state) => ({ deleteCategory: !state.deleteCategory })),

  toggleHomeMenu: () => setState((state) => ({ homeMenu: !state.homeMenu })),
  toggleCreateNoteMenu: () =>
    setState((state) => ({ createNoteMenu: !state.createNoteMenu })),
  toggleEditNoteMenu: () =>
    setState((state) => ({ editNoteMenu: !state.editNoteMenu })),
});
