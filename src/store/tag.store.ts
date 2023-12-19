import { create } from "zustand";
import { Tag } from "../interfaces";

interface TagStore {
  selectedTag?: Tag;
  setSelectedTag: (tag?: Tag) => void;
}

const useTagStore = create<TagStore>((set) => ({
  selectedTag: undefined,
  setSelectedTag: (tag?: Tag) => set(() => ({ selectedTag: tag })),
}));

export default useTagStore;
