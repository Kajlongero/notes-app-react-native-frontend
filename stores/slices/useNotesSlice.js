const initialState = {
  notes: [],
  favorites: {
    data: [],
    pagination: {
      count: 0,
      left: 0,
    },
  },
  notesSelected: {
    categoryId: "",
    data: [],
    total: null,
    left: null,
  },
  createNote: {
    title: "",
    description: "",
    priorityId: null,
    categoryId: "",
  },
};

export const useNotesSlice = (setState, get) => ({
  notes: [],
  favorites: [],
  notesSelected: {
    categoryId: "",
    data: [],
    total: null,
    left: null,
  },
  createNote: {
    title: "",
    description: "",
    priorityId: null,
    categoryId: "",
  },

  updateCreateNoteTitle: (title) =>
    setState((state) => ({
      createNote: {
        ...state.createNote,
        title,
        categoryId: get().selectedCategory,
      },
    })),

  updateCreateNoteDescription: (description) =>
    setState((state) => ({
      createNote: {
        ...state.createNote,
        description,
        categoryId: get().selectedCategory,
      },
    })),

  updateCreateNotePriorityId: (priorityId) =>
    setState((state) => ({
      createNote: {
        ...state.createNote,
        priorityId,
        categoryId: get().selectedCategory,
      },
    })),

  handleFullfillForSelected: (notes) =>
    setState((state) => ({
      notes: [
        {
          categoryId: get().selectedCategory,
          data: notes.data,
          total: notes.pagination.total,
          left: notes.pagination.left,
        },
        ...state.notes,
      ],
      notesSelected: {
        categoryId: get().selectedCategory,
        data: notes.data,
        total: notes.pagination.total,
        left: notes.pagination.left,
      },
    })),

  handleFullfillFavorites: (notes) =>
    setState((s) => ({
      favorites: {
        data: notes.data,
        pagination: {
          count: notes.count,
          left: notes.left,
        },
      },
    })),

  handleChangeSelected: () =>
    setState((state) => {
      const cId = get().selectedCategory;

      const filterInterest = state.notes.filter((n) => n.categoryId === cId)[0];
      const older = state.notesSelected;

      const newArr = [];

      for (let i = 0; i < state.notes.length; i++) {
        if (
          state.notes[i].categoryId !== cId &&
          state.notes[i].categoryId !== older.categoryId
        ) {
          newArr.push(state.notes[i]);
          continue;
        }
        if (state.notes[i].categoryId === cId) {
          newArr.push({ ...filterInterest });
          continue;
        }
        if (state.notes[i].categoryId === older.categoryId) {
          newArr.push({ ...older });
          continue;
        }
      }

      return {
        notesSelected: filterInterest,
        notes: [...newArr],
      };
    }),

  handleAddMore: (notes) =>
    setState((state) => ({
      notesSelected: {
        ...state.notesSelected,
        data: [...notes, ...state.notesSelected.data].sort(
          (a, b) => a.priorityId - b.priorityId
        ),
      },
    })),

  handleAddNote: (note) =>
    setState((state) => ({
      notesSelected: {
        ...state.notesSelected,
        data: [note, ...state.notesSelected.data].sort(
          (a, b) => b.priorityId - a.priorityId
        ),
      },
    })),

  handleUpdateNote: (note) =>
    setState((state) => {
      const getted = state.notesSelected.data.filter((n) => n.id === note.id);
      const newCopy = {
        ...getted,
        ...note,
      };
      const toChange = [];
      const data = state.notesSelected.data;

      for (let i = 0; i < data.length; i++) {
        if (data[i].id !== newCopy.id) {
          toChange.push(data[i]);
          continue;
        }
        if (data[i].id === newCopy.id) {
          toChange.push({ ...newCopy });
        }
      }

      return {
        notesSelected: {
          ...state.notesSelected,
          data: [...toChange.sort((a, b) => b.priorityId - a.priorityId)],
        },
      };
    }),

  handleDeleteNote: (noteId) =>
    setState((state) => ({
      notesSelected: {
        ...state.notesSelected,
        data: [
          ...state.notesSelected.data.filter(
            ({ categoryId }) => categoryId !== noteId
          ),
        ],
      },
    })),

  toggleFavorites: (noteId) =>
    setState((state) => {
      const isOnList = state.favorites.data.some((n) => n.id === noteId);

      const getEverything = [];
      state.notes.map(({ data }) => {
        getEverything.push(...data);
      });
      const filterInterest = getEverything.filter((n) => n.id === noteId);

      if (!filterInterest && isOnList)
        return {
          favorites: {
            ...state.favorites,
            data: [...state.favorites.data.filter((n) => n.id !== noteId)],
          },
        };
    }),

  clearNewNote: () =>
    setState((state) => ({
      ...state,
      createNote: {
        ...initialState.createNote,
      },
    })),

  clearEditNote: () =>
    setState((state) => ({
      ...state,
      editNote: {
        ...initialState.editNote,
      },
    })),

  clearNoteSlice: () =>
    setState((state) => ({
      ...state,
      ...initialState,
    })),
});
