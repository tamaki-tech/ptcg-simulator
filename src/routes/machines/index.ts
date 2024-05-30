import type { Card, DeckSearchResponse } from "$lib/type";
import { assign, createMachine, spawn, type ActorRefFrom } from "xstate";
import { client } from "$lib/apiClient";
import { deckAreaMachine } from "./deckAreaMachine";
import { handsAreaMachine } from "./handsAreaMachine";
import { sideAreaMachine } from "./sideAreaMachine";
import { pokemonAreaMachine } from "./pokemonAreaMachine";
import { trushAreaMachine } from "./trushAreaMachine";
import { lostAreaMachine } from "./lostAreaMachine";
import { stadiumAreaMachine } from "./stadiumAreaMachine";

interface Context {
  code: string;
  deckArea: ActorRefFrom<typeof deckAreaMachine>;
  handArea: ActorRefFrom<typeof handsAreaMachine>;
  sideArea: ActorRefFrom<typeof sideAreaMachine>;
  benchAreas: ActorRefFrom<typeof pokemonAreaMachine>[];
  battleArea: ActorRefFrom<typeof pokemonAreaMachine>;
  trushArea: ActorRefFrom<typeof trushAreaMachine>;
  lostArea: ActorRefFrom<typeof lostAreaMachine>;
  stadiumArea: ActorRefFrom<typeof stadiumAreaMachine>;
}

type Event =
  | { type: "searchDeck"; code: string }
  | { type: "sendCardToHands"; data: Card[] }
  | { type: "sendCardToSide"; data: Card[] }
  | { type: "sendCardToTrush"; data: Card[] }
  | { type: "replacePokemon"; benchNumber: number }
  | { type: "sendCardsToDeckBottom"; data: Card[] }
  | { type: "sendCardsToDeckTop"; data: Card[] }
  | {
      type: "done.invoke.simulator.searchingDeck:invocation[0]";
      data: DeckSearchResponse;
    };

export const PtcgSimulatorMachine = createMachine(
  {
    id: "simulator",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Event,
    },
    initial: "waitForSearchDeck",
    states: {
      waitForSearchDeck: {
        on: {
          searchDeck: "searchingDeck",
        },
      },
      searchingDeck: {
        tags: "loading",
        invoke: {
          src: "serchDeck",
          onDone: {
            target: "ready",
            actions: [
              "spawnMachines",
              "shuffleDeck",
              "dealFullHands",
              "dealSideCards",
            ],
          },
          onError: "waitForSearchDeck",
        },
      },
      ready: {
        on: {
          sendCardToHands: {
            actions: (ctx, evt) => {
              ctx.handArea.send({ type: "dealCards", data: evt.data });
            },
          },
          sendCardToSide: {
            actions: (ctx, evt) => {
              ctx.sideArea.send({ type: "dealCards", data: evt.data });
            },
          },
          sendCardToTrush: {
            actions: (ctx, evt) => {
              ctx.trushArea.send({ type: "dealCards", data: evt.data });
            },
          },
          sendCardsToDeckBottom: {
            actions: (ctx, evt) => {
              ctx.deckArea.send({ type: "cardsToBottom", data: evt.data });
            },
          },
          sendCardsToDeckTop: {
            actions: (ctx, evt) => {
              ctx.deckArea.send({ type: "cardsToTop", data: evt.data });
            },
          },
          replacePokemon: {
            actions: assign({
              battleArea: ({ benchAreas }, evt) => benchAreas[evt.benchNumber],
              benchAreas: ({ benchAreas, battleArea }, evt) => {
                benchAreas.splice(evt.benchNumber, 1, battleArea);
                return benchAreas;
              },
            }),
          },
        },
      },
    },
  },
  {
    actions: {
      spawnMachines: assign({
        handArea: () => spawn(handsAreaMachine),
        sideArea: () => spawn(sideAreaMachine),
        trushArea: () => spawn(trushAreaMachine),
        lostArea: () => spawn(lostAreaMachine),
        stadiumArea: () => spawn(stadiumAreaMachine),
        battleArea: () => spawn(pokemonAreaMachine),
        benchAreas: () => {
          return Array.from({ length: 5 }, (_, i) =>
            spawn(pokemonAreaMachine, `benchArea-${i}`)
          );
        },
        deckArea: ({ deckArea }, evt) => {
          if (evt.type !== "done.invoke.simulator.searchingDeck:invocation[0]")
            return deckArea;
          return spawn(deckAreaMachine({ deck: evt.data }));
        },
      }),
      shuffleDeck: ({ deckArea }) => {
        deckArea.send({ type: "shuffleDeck" });
      },

      dealFullHands: ({ deckArea }) => {
        deckArea.send({ type: "dealCards", quantity: 7 });
      },
      dealSideCards: ({ deckArea }) => {
        deckArea.send({ type: "dealSideCards", quantity: 6 });
      },
    },
    services: {
      serchDeck: async (_, evt) => {
        if (evt.type !== "searchDeck") return;
        return (
          await client.deck.search.$get({ query: { code: evt.code } })
        ).json();
      },
    },
  }
);
