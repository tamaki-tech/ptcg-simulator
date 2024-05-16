import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const apiApp = new Hono();

const bookApp = new Hono();

const bookRoute = bookApp.get("/all", (c) => {
  return c.jsonT({
    message: `All Books`,
  });
});

const apiRoute = apiApp
  .get(
    "/hello",
    zValidator(
      "query",
      z.object({
        name: z.string(),
      })
    ),
    (c) => {
      const { name } = c.req.valid("query");
      return c.jsonT({
        message: `Hello! ${name}`,
      });
    }
  )
  .get("/currentDate", (c) => {
    return c.jsonT({
      datetime: new Date().toISOString(),
    });
  })
  .route("/book", bookRoute);

export type ApiRoute = typeof apiRoute;
