import type { Deck, DeckSearchResponse } from "$lib/type";
import { assign, createMachine, spawn } from "xstate";
import { client } from "$lib/apiClient";
import {
  deckAreaMachine,
  type DeckAreaMachineType,
} from "./machines/deckAreaMachine";

interface Context {
  code: string;
  deckArea: DeckAreaMachineType;
}

type Event =
  | { type: "searchDeck"; code: string }
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
            actions: "spawnMachines",
          },
          onError: "waitForSearchDeck",
        },
      },
      ready: {},
    },
  },
  {
    guards: {},
    actions: {
      spawnMachines: assign({
        deckArea: ({ deckArea }, evt) => {
          if (evt.type !== "done.invoke.simulator.searchingDeck:invocation[0]")
            return deckArea;
          return spawn(deckAreaMachine({ deck: evt.data }));
        },
      }),
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
