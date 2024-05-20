import type { Card, DeckSearchResponse } from "$lib/type";
import { assign, createMachine, spawn } from "xstate";
import { client } from "$lib/apiClient";
import {
  deckAreaMachine,
  type DeckAreaMachineType,
} from "./machines/deckAreaMachine";
import {
  handsAreaMachine,
  type HandsAreaMachineType,
} from "./machines/handsAreaMachine";

interface Context {
  code: string;
  deckArea: DeckAreaMachineType;
  handArea: HandsAreaMachineType;
}

type Event =
  | { type: "searchDeck"; code: string }
  | { type: "sendCardToHands"; data: Card[] }
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
            actions: ["spawnMachines", "shuffleDeck", "dealFullHands"],
          },
          onError: "waitForSearchDeck",
        },
      },
      ready: {
        on: {
          sendCardToHands: {
            actions: (ctx, evt) => {
              if (evt.type !== "sendCardToHands") return ctx;
              ctx.handArea.send({ type: "dealCards", data: evt.data });
            },
          },
        },
      },
    },
  },
  {
    actions: {
      spawnMachines: assign({
        handArea: () => spawn(handsAreaMachine()),
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
