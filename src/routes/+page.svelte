<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import BenchArea from "./components/BenchArea/index.svelte";
  import DeckArea from "./components/DeckArea/index.svelte";
  import DeckCodeModal from "./components/DeckCodeModal.svelte";
  import HandsArea from "./components/HandsArea/index.svelte";
  import SideArea from "./components/SideArea/index.svelte";
  import { PtcgSimulatorMachine } from "./machines/index";

  const { send, state } = useMachine(PtcgSimulatorMachine);

  $: deckArea = $state.context.deckArea;
  $: handArea = $state.context.handArea;
  $: sideArea = $state.context.sideArea;
  $: benchAreas = $state.context.benchAreas;
</script>

{#if $state.value !== "ready"}
  <DeckCodeModal
    loading={$state.hasTag("loading")}
    on:click={(e) => send({ type: "searchDeck", code: e.detail })}
  />
{:else}
  <section class="justify-center items-center flex-1 h-screen max-h-screen">
    <div class="grid grid-rows-[280px_auto_auto] grid-cols-5">
      {#each benchAreas as benchArea, index}
        <div class="flex row-span-1 col-span-1 p-2">
          <BenchArea pokemonArea={benchArea} {index} />
        </div>
      {/each}
      <div class="flex row-span-2 col-span-1 p-2">
        <SideArea {sideArea} />
      </div>
      <div class="row-span-2 col-span-3 p-2">
        <HandsArea {handArea} />
      </div>
      <div class="flex row-span-2 col-span-1 p-2">
        <DeckArea {deckArea} />
      </div>
    </div>
  </section>
{/if}
