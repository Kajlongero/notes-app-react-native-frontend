import { create } from "zustand";
import { useAuthSlice } from "./slices/useAuthSlice";
import { useCategorySlice } from "./slices/useCategorySlice";

export const useGlobalStore = create((set, get) => ({
  ...useAuthSlice(...set, ...get),
  ...useCategorySlice(...set, ...get),
}));
