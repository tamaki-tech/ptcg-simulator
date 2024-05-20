import type { Card } from "$lib/type";
import { assign, createMachine, type ActorRefFrom } from "xstate";

interface Context {
  cards: Card[];
}

type Events = { type: "dealCards"; data: Card[] };

export const handsAreaMachine = () =>
  createMachine({
    id: "handsArea",
    predictableActionArguments: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
    },
    context: {
      cards: [],
    },
    initial: "ready",
    states: {
      ready: {
        on: {
          dealCards: {
            actions: assign({
              cards: ({ cards }, evt) => [...cards, ...evt.data],
            }),
          },
        },
      },
    },
  });

export type HandsAreaMachineType = ActorRefFrom<
  ReturnType<typeof handsAreaMachine>
>;
