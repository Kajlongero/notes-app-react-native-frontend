import { create } from "zustand";
import { useAuthSlice } from "./slices/useAuthSlice";
import { useCategorySlice } from "./slices/useCategorySlice";
import { useNotesSlice } from "./slices/useNotesSlice";
import { useTogglesSlice } from "./slices/useTogglesSlice";

export const useGlobalStore = create((set, get) => ({
  ...useAuthSlice(set, get),
  ...useCategorySlice(set, get),
  ...useNotesSlice(set, get),
  ...useTogglesSlice(set, get),

  clearStore: () => {
    get().clearAuthSlice();
    get().clearCategorySlice();
    get().clearNoteSlice();
    get().clearToggleSlice();
  },
}));
