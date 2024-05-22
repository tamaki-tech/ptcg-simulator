import type { Card } from "$lib/type";
import { assign, createMachine, type ActorRefFrom } from "xstate";

interface Context {
  cards: Card[];
  damage: number;
}

type Events = { type: "assignCards"; data: Card[] };

export const pokemonAreaMachine = () =>
  createMachine({
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
        },
      },
    },
  });

export type PokemonAreaMachineType = ActorRefFrom<
  ReturnType<typeof pokemonAreaMachine>
>;
