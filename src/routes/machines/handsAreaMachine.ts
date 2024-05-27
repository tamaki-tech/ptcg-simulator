import type { Card } from "$lib/type";
import { findCardById } from "$lib/utils/arrayUtils";
import { assign, createMachine, type ActorRefFrom } from "xstate";
import { sendParent } from "xstate/lib/actions";

interface Context {
  cards: Card[];
}

type Events =
  | { type: "dealCards"; data: Card[] }
  | { type: "assignCards"; data: Card[] }
  | { type: "trushCard"; id: string }
  | { type: "trushAllHand" }
  | { type: "sendToDeckBottom" }
  | { type: "sendToDeckTop" };

export const handsAreaMachine = createMachine({
  id: "handsArea",
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
        trushCard: {
          actions: sendParent(({ cards }, { id }) => ({
            type: "sendCardToTrush",
            data: findCardById(cards, id),
          })),
        },
        trushAllHand: {
          actions: sendParent(({ cards }) => ({
            type: "sendCardToTrush",
            data: cards.splice(0),
          })),
        },
        sendToDeckBottom: {
          actions: sendParent(({ cards }) => ({
            type: "sendCardsToDeckBottom",
            data: cards.splice(0),
          })),
        },
        sendToDeckTop: {
          actions: sendParent(({ cards }) => ({
            type: "sendCardsToDeckTop",
            data: cards.splice(0),
          })),
        },
      },
    },
  },
});
