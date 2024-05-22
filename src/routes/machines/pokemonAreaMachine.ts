import type { Card } from "$lib/type";
import { createMachine, type ActorRefFrom } from "xstate";

interface Context {
  cards?: Card[];
}

export const pokemonAreaMachine = () =>
  createMachine({
    id: "pokemonArea",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
    },
    context: {
      cards: [],
    },
    initial: "ready",
    states: {
      ready: {},
    },
  });

export type PokemonAreaMachineType = ActorRefFrom<
  ReturnType<typeof pokemonAreaMachine>
>;
