export const useCategorySlice = (setState, get) => ({
  selectedCategory: "",
  categories: [],

  handleSelectCategory: (selectedCategory) =>
    setState((state) => ({ selectedCategory })),

  handleAddCategory: (category) =>
    setState((state) => ({ categories: [category, ...state.categories] })),

  handleUpdateCategory: (categoryId, changes) =>
    setState((state) => {
      const copy = [...state.categories];
      const index = copy.findIndex((c) => c.id === categoryId);

      const uniqueCategory = { ...state.categories[index], ...changes };
      const newState = [...copy.splice(index, 1, { ...uniqueCategory })];

      return { ...state, categories: [...newState] };
    }),
  handleDeleteCategory: (categoryId) =>
    setState({
      categories: [...state.categories.filter((c) => c.id !== categoryId)],
    }),
});
