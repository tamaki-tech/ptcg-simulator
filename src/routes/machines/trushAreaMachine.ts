import type { Card } from "$lib/type";
import { assign, createMachine, type ActorRefFrom } from "xstate";

interface Context {
  cards: Card[];
}

type Events = { type: "assignCards"; data: Card[] };

export const trushAreaMachine = () =>
  createMachine({
    id: "trushArea",
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
          assignCards: {
            actions: assign({
              cards: (_, evt) => evt.data,
            }),
          },
        },
      },
    },
  });

export type TrushAreaMachineType = ActorRefFrom<
  ReturnType<typeof trushAreaMachine>
>;
