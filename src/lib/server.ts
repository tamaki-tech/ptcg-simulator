import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { DeckSearchResponse } from "./type";

export const apiApp = new Hono();

const deckApp = new Hono();

const deckRoute = deckApp.get(
  "/search",
  zValidator(
    "query",
    z.object({
      code: z.string(),
    })
  ),
  (c) => {
    const response: DeckSearchResponse = {
      result: "OK",
      code: "testCode",
      deck: [
        {
          uuid: "da2e0de6-6154-fecb-fd3d-d3b6f04e7e92",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045707_P_OGAPONMIDORINOMENEX.jpg",
        },
        {
          uuid: "f5088562-69f0-f8cf-f056-e617f5403b7b",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV6/045707_P_OGAPONMIDORINOMENEX.jpg",
        },
        {
          uuid: "5970f7af-c335-e837-a9f4-f07c936d2d56",
          url: "https://www.pokemon-card.com/assets/images/card_images/large/SV5K/045199_P_TAKERURAIKOEX.jpg",
        },
      ],
    };
    return c.jsonT(response);
  }
);

const apiRoute = apiApp.route("/deck", deckRoute);

export type ApiRoute = typeof apiRoute;
