import { useState } from "react";
import type { BaseItem } from '../const/ItemContent';

export interface ItemListViewModel<T extends BaseItem> {
  items: T[];

  reset: () => void;
  createItem: (partial?: Partial<T>) => void;
  removeItem: (id: string) => void;
  updateName: (id: string, name: string) => void;
  updateColor: (id: string, color: string) => void;
  move: (from: number, to: number) => void;
}

export const useItemList = <T extends BaseItem>(
  initialFactory: () => T[],
  createFactory?: () => T
): ItemListViewModel<T> => {

  const [items, setItems] = useState<T[]>(initialFactory);

  const reset = () => setItems(initialFactory());

  const createItem = (partial: Partial<T> = {}) => {
    setItems((prev) => {
      const maxOrder = prev.reduce((m, x) => Math.max(m, (x as any).order ?? 0), 0);

      const base: any = {
        id: crypto.randomUUID(),
        name: "",
        order: maxOrder + 1,
        color: "#475569"
      };

      return [
        ...prev,
        {
          ...base,
          ...(createFactory ? createFactory() : {}),
          ...partial,
        } as T,
      ];
    });
  };


  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const updateName = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, name } : x))
    );
  };

  const updateColor = (id: string, color: string) => {
    setItems((prev) =>
      prev.map((x) =>
        x.id === id ? ({ ...x, color } as T) : x
      )
    );
  };

  const move = (from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return {
    items,
    reset,
    createItem,
    removeItem,
    updateName,
    updateColor,
    move,
  };
};
