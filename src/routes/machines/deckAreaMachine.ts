import type { Card, Deck } from "$lib/type";
import { findCardById, shuffleArray } from "$lib/utils/arrayUtils";
import { assign, createMachine, type ActorRefFrom } from "xstate";
import { sendParent } from "xstate/lib/actions";

interface Context {
  deck: Deck;
}

type Events =
  | { type: "dealCards"; quantity?: number }
  | { type: "dealSideCards"; quantity?: number }
  | { type: "pickCard"; id: string }
  | { type: "shuffleDeck" }
  | { type: "cardsToBottom"; data: Card[] }
  | { type: "cardsToTop"; data: Card[] }
  | { type: "trushCard"; id: string };

export const deckAreaMachine = (context: Context) =>
  createMachine({
    id: "deckArea",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context,
    initial: "ready",
    states: {
      ready: {
        on: {
          dealCards: {
            actions: sendParent(({ deck }, { quantity }) => ({
              type: "sendCardToHands",
              data: deck.cards.splice(-(quantity ?? 1)),
            })),
          },
          dealSideCards: {
            actions: sendParent(({ deck }, { quantity }) => ({
              type: "sendCardToSide",
              data: deck.cards.splice(-(quantity ?? 1)),
            })),
          },
          trushCard: {
            actions: sendParent(({ deck }, { id }) => ({
              type: "sendCardToTrush",
              data: findCardById(deck.cards, id),
            })),
          },
          pickCard: {
            actions: sendParent(({ deck }, { id }) => ({
              type: "sendCardToHands",
              data: findCardById(deck.cards, id),
            })),
          },
          shuffleDeck: {
            actions: assign({
              deck: ({ deck }) => {
                return { ...deck, cards: shuffleArray(deck.cards) };
              },
            }),
          },
          cardsToBottom: {
            actions: assign({
              deck: ({ deck }, { data }) => {
                const result = shuffleArray(data);
                return { ...deck, cards: [...result, ...deck.cards] };
              },
            }),
          },
          cardsToTop: {
            actions: assign({
              deck: ({ deck }, { data }) => {
                const result = shuffleArray(data);
                return { ...deck, cards: [...deck.cards, ...result] };
              },
            }),
          },
        },
      },
    },
  });
