<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import BattleArea from "./components/Areas/BattleArea.svelte";
  import BenchArea from "./components/Areas/BenchArea.svelte";
  import DeckArea from "./components/Areas/DeckArea/index.svelte";
  import HandsArea from "./components/Areas/HandsArea.svelte";
  import LostArea from "./components/Areas/LostArea.svelte";
  import SideArea from "./components/Areas/SideArea.svelte";
  import StadiumArea from "./components/Areas/StadiumArea.svelte";
  import SupplyArea from "./components/Areas/SupplyArea/index.svelte";
  import TrushArea from "./components/Areas/TrushArea.svelte";
  import DeckCodeModal from "./components/DeckCodeModal.svelte";
  import Toasts from "./components/Toasts/index.svelte";
  import { PtcgSimulatorMachine } from "./machines/index";

  const { send, state } = useMachine(PtcgSimulatorMachine);

  $: deckArea = $state.context.deckArea;
  $: handArea = $state.context.handArea;
  $: sideArea = $state.context.sideArea;
  $: benchAreas = $state.context.benchAreas;
  $: battleArea = $state.context.battleArea;
  $: trushArea = $state.context.trushArea;
  $: lostArea = $state.context.lostArea;
  $: stadiumArea = $state.context.stadiumArea;
</script>

{#if $state.value !== "ready"}
  <DeckCodeModal
    loading={$state.hasTag("loading")}
    on:click={(e) => send({ type: "searchDeck", code: e.detail })}
  />
{:else}
  <Toasts />

  <section class="justify-center items-center flex-1 h-screen max-h-screen">
    <section class="grid grid-rows-1 grid-cols-4 gap-4">
      <div class="flex row-span-1 col-span-1">
        <StadiumArea {stadiumArea} />
      </div>
      <div class="flex row-span-1 col-span-2">
        <BattleArea pokemonArea={battleArea} />
      </div>
      <div class="flex row-span-1 col-span-1">
        <SupplyArea />
      </div>
    </section>

    <section class="grid grid-rows-1 grid-cols-5 gap-4 py-4">
      {#each benchAreas as benchArea, index}
        <div class="flex row-span-1 col-span-1">
          <BenchArea
            pokemonArea={benchArea}
            {index}
            on:replacePokemon={() => {
              send({ type: "replacePokemon", benchNumber: index });
            }}
          />
        </div>
      {/each}
    </section>

    <section class="grid grid-rows-2 grid-cols-5 gap-4">
      <div class="flex row-span-2 col-span-1">
        <SideArea {sideArea} />
      </div>
      <div class="flex row-span-2 col-span-2">
        <HandsArea {handArea} />
      </div>
      <div
        class="grid grid-rows-subgrid grid-cols-subgrid row-span-2 col-span-1"
      >
        <div class="flex row-span-1">
          <TrushArea {trushArea} />
        </div>
        <div class="flex row-span-1">
          <LostArea {lostArea} />
        </div>
      </div>
      <div class="flex row-span-2 col-span-1">
        <DeckArea {deckArea} />
      </div>
    </section>
  </section>
{/if}
