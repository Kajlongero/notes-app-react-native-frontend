import { changeByCoincidence } from "../../utils/changeByCoincidence";

const initialState = {
  notes: [],
  noteToDelete: "",
  favorites: {
    data: [],
    pagination: {
      count: 0,
      left: 0,
    },
    alreadyFetched: false,
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

export const useNotesSlice = (set, get) => ({
  notes: [],
  favorites: {
    data: [],
    pagination: {
      count: 0,
      left: 0,
    },
    alreadyFetched: false,
  },
  noteToDelete: "",
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
    set((state) => ({
      createNote: {
        ...state.createNote,
        title,
        categoryId: get().selectedCategory,
      },
    })),

  updateCreateNoteDescription: (description) =>
    set((state) => ({
      createNote: {
        ...state.createNote,
        description,
        categoryId: get().selectedCategory,
      },
    })),

  updateCreateNotePriorityId: (priorityId) =>
    set((state) => ({
      createNote: {
        ...state.createNote,
        priorityId,
        categoryId: get().selectedCategory,
      },
    })),

  handleFullfillForSelected: (notes) =>
    set((state) => ({
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
    set((state) => {
      return {
        ...state,
        favorites: {
          data: notes.data,
          pagination: {
            left: notes.pagination.left,
            count: notes.pagination.count,
          },
          alreadyFetched: true,
        },
      };
    }),

  handleChangeNoteToDelete: (noteToDelete) =>
    set((state) => ({
      noteToDelete,
    })),

  handleChangeSelected: () =>
    set((state) => {
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
    set((state) => ({
      notesSelected: {
        ...state.notesSelected,
        data: [...notes, ...state.notesSelected.data].sort(
          (a, b) => a.priorityId - b.priorityId
        ),
      },
    })),

  handleAddNote: (note) =>
    set((state) => ({
      notesSelected: {
        ...state.notesSelected,
        data: [note, ...state.notesSelected.data].sort(
          (a, b) => b.priorityId - a.priorityId
        ),
      },
    })),

  handleUpdateNote: (note) =>
    set((state) => {
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
        favorites: {
          ...state.favorites,
          pagination: {
            ...state.favorites.pagination,
            count:
              !!note.isFavorite && !!state.favorites.alreadyFetched
                ? state.favorites.pagination.count + 1
                : state.favorites.pagination.count,
          },
          data:
            !!note.isFavorite && !!state.favorites.alreadyFetched
              ? [note, ...state.favorites.data]
              : state.favorites.data,
        },
        notesSelected: {
          ...state.notesSelected,
          data: [...toChange.sort((a, b) => b.priorityId - a.priorityId)],
        },
      };
    }),

  handleDeleteNote: (noteId) =>
    set((state) => ({
      noteToDelete: "",
      notesSelected: {
        ...state.notesSelected,
        data: [...state.notesSelected.data.filter(({ id }) => id !== noteId)],
      },
    })),

  handleDeleteManyWithCategoryId: (categoryId) =>
    set((state) => {
      return {
        ...state,
        notesSelected:
          state.notesSelected.categoryId === categoryId
            ? { ...initialState.notesSelected }
            : { ...state.notesSelected },
        notes: [...state.notes.filter((n) => n.categoryId !== categoryId)],
      };
    }),

  toggleFavorites: (note) =>
    set((state) => {
      const allNotes = state.notes;
      const actualNotes = state.notesSelected;
      const pushDataUpdated = [];

      for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].categoryId !== actualNotes.categoryId) {
          pushDataUpdated.push({ ...allNotes[i] });
          continue;
        }

        if (allNotes[i].categoryId === actualNotes.categoryId)
          pushDataUpdated.push({ ...actualNotes });
      }

      const some = pushDataUpdated.some(
        (n) => n.categoryId === note.categoryId
      );

      if (some && state.favorites.alreadyFetched) {
        get().handleUpdateNote(note);

        return {
          favorites: {
            ...state.favorites,
            data: note.isFavorite
              ? [note, ...state.favorites.data]
              : state.favorites.data.filter((n) => n.id !== note.id),
          },
        };
      }

      if (!some && state.favorites.alreadyFetched) {
        return {
          favorites: {
            ...state.favorites,
            data: state.favorites.data.filter((n) => n.id !== note.id),
            pagination: {
              ...state.favorites.pagination,
              count: state.favorites.pagination.count - 1,
            },
          },
        };
      }

      if (some && !state.favorites.alreadyFetched) {
        const newArrToUpdate = [];
        const data = actualNotes.data;

        for (let i = 0; i < data.length; i++) {
          if (data[i].id === note.id) {
            newArrToUpdate.push({ ...note });
          }
          if (data[i].id !== note.id) {
            newArrToUpdate.push({ ...data[i] });
          }
        }

        return {
          notes: [...pushDataUpdated],
          notesSelected: {
            ...state.notesSelected,
            data: [...newArrToUpdate],
          },
        };
      }

      return state;
    }),

  handleAddFavorites: (note) =>
    set((state) => {
      const canAdd = state.favorites.alreadyFetched;

      const getNotes = state.notes;
      const actual = state.notesSelected;

      const newActual = changeByCoincidence(note, actual.data, "id");
      const obj = { ...actual, data: [...newActual] };

      const change = changeByCoincidence(obj, getNotes, "categoryId");

      return {
        ...state,
        notes: [...change],
        notesSelected: {
          ...obj,
        },
        favorites: {
          ...state.favorites,
          data: canAdd
            ? [note, ...state.favorites.data]
            : [...state.favorites.data],
          pagination: {
            ...state.favorites.pagination,
            count: canAdd
              ? state.favorites.pagination.count + 1
              : state.favorites.pagination.count,
          },
        },
      };
    }),

  handleRemoveFromFavorites: (note) =>
    set((state) => {
      const canAdd = state.favorites.alreadyFetched;

      const getNotes = [...state.notes];
      const categoryBelong =
        note.categoryId === state.categoryId
          ? state.notesSelected
          : getNotes.filter((n) => n.categoryId === note.categoryId)[0];
      const notesBelong = categoryBelong;

      const newActual = changeByCoincidence(note, notesBelong.data, "id");
      const obj = { ...categoryBelong, data: [...newActual] };

      const change = changeByCoincidence(obj, getNotes, "categoryId");

      return {
        ...state,
        notes: [...change],
        notesSelected:
          note.categoryId === state.categoryId
            ? { ...obj }
            : { ...state.notesSelected },
        favorites: {
          ...state.favorites,
          data: canAdd
            ? [...state.favorites.data.filter((n) => n.id !== note.id)]
            : [...state.favorites.data],
          pagination: {
            ...state.favorites.pagination,
            count: canAdd
              ? state.favorites.pagination.count - 1
              : state.favorites.pagination.count,
          },
        },
      };
    }),

  clearNewNote: () =>
    set((state) => ({
      ...state,
      createNote: {
        ...initialState.createNote,
      },
    })),

  clearEditNote: () =>
    set((state) => ({
      ...state,
      editNote: {
        ...initialState.editNote,
      },
    })),

  clearNoteSlice: () =>
    set((state) => ({
      ...state,
      ...initialState,
    })),
});
