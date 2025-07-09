import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  sidebar: false,
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
  setSidebar: (value) => set({ sidebar: value }),
}));
