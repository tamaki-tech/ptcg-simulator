<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { PtcgSimulatorMachine } from "./ptcgSimulatorMachine";
  import DeckCodeModal from "./components/DeckCodeModal.svelte";
  import DeckArea from "./components/DeckArea/index.svelte";

  const { send, state } = useMachine(PtcgSimulatorMachine);

  $: deckArea = $state.context.deckArea;
</script>

{#if $state.value !== "ready"}
  <DeckCodeModal
    loading={$state.hasTag("loading")}
    on:click={(e) => send({ type: "searchDeck", code: e.detail })}
  />
{/if}

<section class="flex flex-col justify-center items-center flex-1">
  <DeckArea {deckArea} />
</section>
