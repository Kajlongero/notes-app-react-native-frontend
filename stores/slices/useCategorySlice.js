const initialState = {
  selectedCategory: "",
  categoryToDelete: "",
  categories: {
    data: [],
    pagination: {
      left: 0,
      total: 0,
    },
  },
};

export const useCategorySlice = (setState, get) => ({
  selectedCategory: "",
  categoryToDelete: "",
  categories: {
    data: [],
    pagination: {
      left: 0,
      total: 0,
    },
  },

  handleSelectCategory: (selectedCategory) =>
    setState(() => ({ selectedCategory })),

  handleSelectCategoryToDelete: (categoryToDelete) =>
    setState(() => ({ categoryToDelete })),

  handleFullfillCategories: (categories) =>
    setState((state) => ({
      categories: { ...categories },
      selectedCategory: categories.data[0].id,
    })),

  handleAddCategory: (category) =>
    setState((state) => ({
      selectedCategory: !state.categories.data.length
        ? category.id
        : state.selectedCategory,
      categories: {
        ...state.categories,
        pagination: {
          ...state.categories.pagination,
          count: state.categories.count + 1,
          left: state.categories.left + 1,
        },
        data: [...state.categories.data, category],
      },
    })),

  handleUpdateCategory: (categoryId, changes) =>
    setState((state) => {
      const copy = [...state.categories.data];
      const index = copy.findIndex((c) => c.id === categoryId);

      const uniqueCategory = { ...state.categories.data[index], ...changes };
      const newState = [...copy.splice(index, 1, { ...uniqueCategory })];

      return {
        categories: { ...state.categories, data: [...newState] },
      };
    }),
  handleDeleteCategory: (categoryId) =>
    setState((state) => {
      get().handleDeleteManyWithCategoryId(categoryId);
      return {
        selectedCategory:
          state.selectedCategory === categoryId ? "" : state.selectedCategory,
        categories: {
          ...state.categories,
          data: [...state.categories.data.filter((c) => c.id !== categoryId)],
        },
      };
    }),

  clearCategorySlice: () =>
    setState((state) => ({
      ...state,
      ...initialState,
    })),
});
