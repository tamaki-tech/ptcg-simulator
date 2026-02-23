# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pokemon Trading Card Game (PTCG) simulator — a single-page web app where users enter a deck code, load a deck, and interact with a virtual game board (draw cards, place on bench/battle area, manage discard/lost zones, etc.).

## Commands

- **Dev server**: `pnpm dev` (or `pnpm dev --open`)
- **Build**: `pnpm build`
- **Type check**: `pnpm check` (runs `svelte-kit sync && svelte-check`)
- **Type check (watch)**: `pnpm check:watch`

Package manager is **pnpm** (enforced via `.npmrc` `engine-strict=true`). No linter or test runner is configured.

## Tech Stack

- **SvelteKit 2** (Svelte 4) with file-based routing, deployed to **Cloudflare Workers** (`@sveltejs/adapter-cloudflare`)
- **XState 4** for state management (actor model pattern)
- **Hono** as an embedded API framework (runs inside SvelteKit server hooks)
- **Tailwind CSS 3** + **Flowbite Svelte** component library
- **Zod** for API input validation
- **svelte-dnd-action** for drag-and-drop card interactions
- TypeScript strict mode enabled

## Architecture

### State Machine Layer (`src/routes/machines/`)

The core of the application. `PtcgSimulatorMachine` is the root XState machine that orchestrates the entire game state:

1. **Lifecycle**: `waitForSearchDeck` → `searchingDeck` → `ready`
2. On deck search completion, the root machine **spawns child actor machines** for each game zone:
   - `deckAreaMachine` (factory function — receives initial deck data)
   - `handsAreaMachine`, `sideAreaMachine`, `trashAreaMachine` (discard), `lostAreaMachine`, `stadiumAreaMachine`
   - `pokemonAreaMachine` — reused for both battle area (1 instance) and bench areas (5 instances)
3. After spawning, it auto-shuffles the deck, deals 7 cards to hand, and deals 6 side cards.
4. Child actors communicate upward via `sendParent()`. The root machine forwards events between actors (e.g., deck sends drawn cards → root forwards to hand area).

### API Layer

- **Server**: `src/lib/server.ts` — Hono app with route `/api/deck/search?code={deckCode}`. Currently returns mock card data.
- **Hooks**: `src/hooks.server.ts` — intercepts `/api/*` requests and delegates to the Hono app via `app.handleEvent()`.
- **Client**: `src/lib/apiClient.ts` — type-safe Hono RPC client (`hc<ApiRoute>`) used by the state machine's `searchDeck` service.

The `ApiRoute` type is exported from `server.ts` and consumed by the client, giving end-to-end type safety between server routes and client calls.

### Component Layer (`src/routes/components/`)

- `Areas/` — one component per game zone (DeckArea, HandsArea, BattleArea, BenchArea, SideArea, TrushArea, LostArea, StadiumArea, SupplyArea)
- Components receive XState actor refs as props and use `@xstate/svelte` (`useMachine`/`useSelector`) for reactivity
- `DragAndDropSection.svelte` wraps `svelte-dnd-action` for card movement between zones
- `CardListModal.svelte` and `CardViewModal.svelte` provide modal UIs for inspecting cards
- `DamageCounter.svelte` handles damage counter increment/decrement on Pokemon

### Shared Code (`src/lib/`)

- `type.ts` — core types (`Card`, `Deck`, `DeckSearchResponse`)
- `utils/arrayUtils.ts` — `findCardById` (find + remove) and `shuffleArray` (Fisher-Yates)

## Conventions

- Component directories use `index.svelte` as the main entry point
- Game terminology uses PTCG Japanese names in some places (e.g., `trash` = discard/trash pile)
- `pokemonAreaMachine` is a general-purpose machine reused for both battle and bench positions
- `deckAreaMachine` is a factory function (not a static machine) because it needs initial deck data at spawn time
