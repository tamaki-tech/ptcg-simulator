import type { Card } from "$lib/type";
import { assign, createMachine } from "xstate";

interface Context {
  cards: Card[];
}

type Events =
  | { type: "dealCards"; data: Card[] }
  | { type: "assignCards"; data: Card[] };

export const sideAreaMachine = createMachine({
  id: "sideArea",
  predictableActionArguments: true,
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
  context: {
    cards: [],
  },
  initial: "ready",
  states: {
    ready: {
      on: {
        dealCards: {
          actions: assign({
            cards: ({ cards }, evt) => [...cards, ...evt.data],
          }),
        },
        assignCards: {
          actions: assign({
            cards: (_, evt) => evt.data,
          }),
        },
      },
    },
  },
});
