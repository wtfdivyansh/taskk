import {create} from "zustand";

interface ModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
}
interface BoardModalStore {
  boardId: string;
  isOpen: boolean;
  setBoardId: (boardId: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
}
interface CardModalStore {
 boardId: string;
 columnId: string;
  isOpen: boolean;
  setBoardId: (boardId: string) => void;

  setColumnId: (columnId: string) => void;

  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set({ isOpen:true }),
  onClose: () => set({ isOpen: false }),
}));

export const cateogaryModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set({ isOpen:true }),
  onClose: () => set({ isOpen: false }),
}));

export const boardModalStore = create<BoardModalStore>((set) => ({
  boardId: "",
  isOpen: false,
  setBoardId: (boardId: string) => set({ boardId:boardId }),
  setIsOpen: () => set({ isOpen:true }),
  onClose: () => set({ isOpen: false }),
}));
export const useCardModalStore = create<CardModalStore>((set) => ({
  boardId: "",
  columnId: "",
  isOpen: false,
  setColumnId: (columnId: string) => set({ columnId:columnId }),
  setBoardId: (boardId: string) => set({ boardId:boardId }),
  setIsOpen: () => set({ isOpen:true }),
  onClose: () => set({ isOpen: false }),
}));
export const useAddMember = create<BoardModalStore>((set) => ({
  isOpen: false,
  boardId: "",
  setBoardId: (boardId: string) => set({ boardId:boardId }),
  setIsOpen: () => set({ isOpen:true }),
  onClose: () => set({ isOpen: false }),
}));