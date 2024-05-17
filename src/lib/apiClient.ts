import type { ApiRoute } from "$lib/server";
import { hc } from "hono/client";

export const client = hc<ApiRoute>("/api");
