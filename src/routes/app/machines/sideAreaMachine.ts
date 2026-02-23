import type { Card } from "$lib/type";
import { findCardById } from "$lib/utils/arrayUtils";
import { assign, createMachine } from "xstate";
import { sendParent } from "xstate/lib/actions";

interface Context {
  cards: Card[];
}

type Events =
  | { type: "dealCards"; data: Card[] }
  | { type: "assignCards"; data: Card[] }
  | { type: "pickSideCard"; id: string }
  | { type: "pickTwoSide" }
  | { type: "pickOneSide" };

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
        pickSideCard: {
          actions: sendParent(({ cards }, { id }) => ({
            type: "sendCardToHands",
            data: findCardById(cards, id),
          })),
        },
        pickTwoSide: {
          cond: ({ cards }) => cards.length > 1,
          actions: sendParent(({ cards }) => ({
            type: "sendCardToHands",
            data: cards.splice(-2),
          })),
        },
        pickOneSide: {
          cond: ({ cards }) => cards.length > 0,
          actions: sendParent(({ cards }) => ({
            type: "sendCardToHands",
            data: cards.splice(-1),
          })),
        },
      },
    },
  },
});
