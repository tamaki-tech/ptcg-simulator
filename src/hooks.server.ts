import { apiApp } from "$lib/server";
import type { Handle } from "@sveltejs/kit";
import { Hono } from "hono";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/api")) {
    const app = new Hono({ strict: false }).route("/api", apiApp);
    return await app.handleEvent(event);
  }

  return resolve(event);
};
