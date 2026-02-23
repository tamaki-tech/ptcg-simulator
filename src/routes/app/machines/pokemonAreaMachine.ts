import type { Card } from "$lib/type";
import { findCardById } from "$lib/utils/arrayUtils";
import { assign, createMachine, sendParent, type ActorRefFrom } from "xstate";

interface Context {
  cards: Card[];
  damage: number;
}

type Events =
  | { type: "assignCards"; data: Card[] }
  | { type: "addDamage" }
  | { type: "subDamage" }
  | { type: "trashAllCards" }
  | { type: "sendAllCardToHand" }
  | { type: "trashCard"; id: string }
  | { type: "sendCardToTop"; id: string }
  | { type: "sendCardToBottom"; id: string };

export const pokemonAreaMachine = createMachine(
  {
    id: "pokemonArea",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      cards: [],
      damage: 0,
    },
    initial: "ready",
    states: {
      ready: {
        on: {
          assignCards: {
            actions: assign({
              cards: (_, evt) => evt.data,
            }),
          },
          addDamage: {
            actions: assign({
              damage: ({ damage }) => damage + 10,
            }),
          },
          subDamage: {
            cond: "canSubDamage",
            actions: assign({
              damage: ({ damage }) => damage - 10,
            }),
          },
          trashAllCards: {
            actions: sendParent(({ cards }) => ({
              type: "sendCardToTrash",
              data: cards.splice(0),
            })),
          },
          sendAllCardToHand: {
            actions: sendParent(({ cards }) => ({
              type: "sendCardToHands",
              data: cards.splice(0),
            })),
          },
          trashCard: {
            actions: sendParent(({ cards }, { id }) => ({
              type: "sendCardToTrash",
              data: findCardById(cards, id),
            })),
          },
          sendCardToTop: {
            actions: sendParent(({ cards }, { id }) => ({
              type: "sendCardsToDeckTop",
              data: findCardById(cards, id),
            })),
          },
          sendCardToBottom: {
            actions: sendParent(({ cards }, { id }) => ({
              type: "sendCardsToDeckBottom",
              data: findCardById(cards, id),
            })),
          },
        },
      },
    },
  },
  {
    guards: {
      canSubDamage: (ctx) => ctx.damage > 0,
    },
  }
);
