import type { Card } from "$lib/type";
import { assign, createMachine, type ActorRefFrom } from "xstate";
import { sendParent } from "xstate/lib/actions";

interface Context {
  cards: Card[];
}

type Events =
  | { type: "dealCards"; data: Card }
  | { type: "assignCards"; data: Card[] }
  | { type: "pickCard"; id: string };

export const lostAreaMachine = createMachine({
  id: "lostArea",
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
            cards: ({ cards }, evt) => [...cards, evt.data],
          }),
        },
        assignCards: {
          actions: assign({
            cards: (_, evt) => evt.data,
          }),
        },
        pickCard: {
          actions: sendParent(({ cards }, { id }) => ({
            type: "sendCardToHands",
            // TODO 共通化
            data: cards.splice(
              cards.findIndex((c) => c.id === id),
              1
            ),
          })),
        },
      },
    },
  },
});
