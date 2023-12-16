import { create } from "zustand";
import { Category } from "../interfaces";

interface CategoriesStore {
  categories: Category[];
  selectedCategory?: Category;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (category?: Category) => void;
}

const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  selectedCategory: undefined,
  setCategories: (categories: Category[]) => set(() => ({ categories })),
  setSelectedCategory: (category?: Category) =>
    set(() => ({ selectedCategory: category })),
}));

export default useCategoriesStore;
