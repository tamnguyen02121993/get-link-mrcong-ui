import { create } from "zustand";

interface PaginationStore {
  page?: number;
  canNext: boolean;
  canPrev: boolean;
  setPage: (page?: number) => void;
}

const usePaginationStore = create<PaginationStore>((set) => ({
  page: undefined,
  canNext: false,
  canPrev: false,
  setPage: (page?: number) =>
    set(() => {
      if (!page) return { page: undefined };
      if (page <= 1) return { page: 1, canNext: true, canPrev: false };
      return { page, canNext: true, canPrev: true };
    }),
}));

export default usePaginationStore;
