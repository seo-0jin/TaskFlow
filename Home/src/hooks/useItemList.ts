import { useState } from "react";
import type { ItemContent } from "../const/IssueStatus";

export interface ItemListViewModel {
  items: ItemContent[];

  reset: () => void;
  createItem: (defaultColor?: string) => void;
  removeItem: (id: string) => void;
  updateName: (id: string, name: string) => void;
  updateColor: (id: string, color: string) => void;
  move: (from: number, to: number) => void;
}

export const useItemList = (initialFactory: () => ItemContent[]): ItemListViewModel => {
  const [items, setItems] = useState<ItemContent[]>(initialFactory);

  const reset = () => setItems(initialFactory());

  const createItem = (defaultColor = "#475569") => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", color: defaultColor },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const updateName = (id: string, name: string) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, name } : x)));
  };

  const updateColor = (id: string, color: string) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, color } : x)));
  };

  const move = (from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return { items, reset, createItem, removeItem, updateName, updateColor, move };
};
