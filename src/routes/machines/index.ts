import type { Deck, DeckSearchResponse } from "$lib/type";
import { assign, createMachine } from "xstate";
import { client } from "$lib/apiClient";

interface Context {
  code: string;
  deck: Deck;
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
    initial: "waitingForCode",
    states: {
      waitingForCode: {
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
            actions: "assignContext",
          },
          onError: "waitingForCode",
        },
      },
      ready: {},
    },
  },
  {
    guards: {},
    actions: {
      assignContext: assign({
        deck: ({ deck }, evt) => {
          if (evt.type !== "done.invoke.simulator.searchingDeck:invocation[0]")
            return deck;
          return evt.data;
        },
      }),
    },
    services: {
      serchDeck: async (_, evt) => {
        if (evt.type !== "searchDeck") return;

        // TODO: 動作確認で1.5秒まつ
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return (
          await client.deck.search.$get({ query: { code: evt.code } })
        ).json();
      },
    },
  }
);
