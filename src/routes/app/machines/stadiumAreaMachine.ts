import type { Card } from "$lib/type";
import { findCardById } from "$lib/utils/arrayUtils";
import { assign, createMachine } from "xstate";
import { sendParent } from "xstate/lib/actions";

interface Context {
  cards: Card[];
}

type Events =
  | { type: "dealCards"; data: Card }
  | { type: "assignCards"; data: Card[] }
  | { type: "sendAllCardToTrash" }
  | { type: "trashCard"; id: string };

export const stadiumAreaMachine = createMachine({
  id: "stadiumArea",
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
        sendAllCardToTrash: {
          actions: sendParent(({ cards }) => ({
            type: "sendCardToTrash",
            data: cards.splice(0),
          })),
        },
        trashCard: {
          actions: sendParent(({ cards }, { id }) => ({
            type: "sendCardToTrash",
            data: findCardById(cards, id),
          })),
        },
      },
    },
  },
});
