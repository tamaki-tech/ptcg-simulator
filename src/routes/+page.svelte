<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { PtcgSimulatorMachine } from "./ptcgSimulatorMachine";
  import DeckCodeModal from "./components/DeckCodeModal.svelte";
  import DeckArea from "./components/DeckArea/index.svelte";
  import HandsArea from "./components/HandsArea/index.svelte";

  const { send, state } = useMachine(PtcgSimulatorMachine);

  $: deckArea = $state.context.deckArea;
  $: handArea = $state.context.handArea;
</script>

{#if $state.value !== "ready"}
  <DeckCodeModal
    loading={$state.hasTag("loading")}
    on:click={(e) => send({ type: "searchDeck", code: e.detail })}
  />
{/if}

<section class="flex justify-center items-center flex-1 h-screen">
  <div class="grid grid-cols-3">
    <div class="col-span-2 p-4">
      <HandsArea {handArea} />
    </div>
    <div class="col-span-1 p-4">
      <DeckArea {deckArea} />
    </div>
  </div>
</section>
