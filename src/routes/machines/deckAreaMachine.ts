import type { Deck } from "$lib/type";
import { createMachine, type ActorRefFrom } from "xstate";

interface Context {
  deck: Deck;
}

export const deckAreaMachine = (context: Context) =>
  createMachine({
    id: "deckArea",
    predictableActionArguments: true,
    context,
    initial: "ready",
    states: {
      ready: {},
    },
  });

export type DeckAreaMachineType = ActorRefFrom<
  ReturnType<typeof deckAreaMachine>
>;
