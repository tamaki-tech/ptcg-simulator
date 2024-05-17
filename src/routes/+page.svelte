<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import { useMachine } from "@xstate/svelte";
  import { PtcgSimulatorMachine } from "./machines";
  import DeckCodeModal from "./components/DeckCodeModal.svelte";

  const { send, state } = useMachine(PtcgSimulatorMachine);
</script>

{#if $state.value !== "ready"}
  <DeckCodeModal
    loading={$state.hasTag("loading")}
    on:click={(e) => send({ type: "searchDeck", code: e.detail })}
  />
{/if}

<div class="p-8">
  <Alert>
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
</div>

<section class="flex flex-col justify-center items-center flex-1">
  <p>ツールエリア</p>
</section>
