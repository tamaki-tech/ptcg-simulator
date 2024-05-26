import type { Deck } from "$lib/type";
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
  | { type: "trushCard"; id: string };

// TODO Util切り出す
const shuffleArray = (array: any) => {
  const cloneArray = [...array];
  const result = cloneArray.reduce((_, cur, idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand];
    cloneArray[rand] = cur;
    return cloneArray;
  });

  return result;
};

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
          shuffleDeck: {
            actions: assign({
              deck: ({ deck }) => {
                return { ...deck, cards: shuffleArray(deck.cards) };
              },
            }),
          },
          trushCard: {
            actions: sendParent(({ deck }, { id }) => ({
              type: "sendCardToTrush",
              // TODO 共通化
              data: deck.cards.splice(
                deck.cards.findIndex((c) => c.id === id),
                1
              ),
            })),
          },
          pickCard: {
            actions: sendParent(({ deck }, { id }) => ({
              type: "sendCardToHands",
              // TODO 共通化
              data: deck.cards.splice(
                deck.cards.findIndex((c) => c.id === id),
                1
              ),
            })),
          },
        },
      },
    },
  });

export type DeckAreaMachineType = ActorRefFrom<
  ReturnType<typeof deckAreaMachine>
>;
