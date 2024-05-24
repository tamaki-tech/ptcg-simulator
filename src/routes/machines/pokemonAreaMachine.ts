import type { Card } from "$lib/type";
import { assign, createMachine, type ActorRefFrom } from "xstate";

interface Context {
  cards: Card[];
  damage: number;
}

type Events =
  | { type: "assignCards"; data: Card[] }
  | { type: "addDamege" }
  | { type: "subDamage" };

export const pokemonAreaMachine = () =>
  createMachine(
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
            addDamege: {
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

export type PokemonAreaMachineType = ActorRefFrom<
  ReturnType<typeof pokemonAreaMachine>
>;
