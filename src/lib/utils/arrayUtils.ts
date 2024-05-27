import type { Card } from "$lib/type";

export const findCardById = (cards: Card[], id: string): Card[] => {
  return cards.splice(
    cards.findIndex((c) => c.id === id),
    1
  );
};

export const shuffleArray = (array: any) => {
  const cloneArray = [...array];
  const result = cloneArray.reduce((_, cur, idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand];
    cloneArray[rand] = cur;
    return cloneArray;
  });

  return result;
};
