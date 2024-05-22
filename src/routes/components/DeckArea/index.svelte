<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";
  import { Button, Card } from "flowbite-svelte";
  import type { DeckAreaMachineType } from "../../machines/deckAreaMachine";
  import CardListModal from "./CardListModal.svelte";

  export let deckArea: DeckAreaMachineType | undefined;

  let openDeckListModal = false;

  $: deck = $deckArea?.context.deck;
</script>

{#if $deckArea?.value === "ready"}
  <CardListModal
    {deck}
    title={`Deck Card List (${deck?.cards.length})`}
    bind:openModal={openDeckListModal}
  />

  <Card padding="lg">
    <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
      Deck ({deck?.cards.length})
    </h5>
    <div>
      <img
        alt="poke_ura"
        role="none"
        class="cursor-pointer hover:opacity-80 transition-opacity object-contain h-36 w-full"
        src={pokeUraImg}
        on:click={() => deckArea?.send("dealCards")}
      />
    </div>

    <!-- Menuの位置を検討する -->
    <div class="py-4">
      <div class="py-1">
        <Button
          size="xs"
          class="w-full p-2"
          on:click={() => deckArea?.send({ type: "shuffleDeck" })}
        >
          shuffle
        </Button>
      </div>
      <div class="py-1">
        <Button size="xs" class="w-full py-2">flip deck top</Button>
      </div>
      <div class="py-1">
        <Button
          size="xs"
          class="w-full py-2"
          on:click={() => (openDeckListModal = true)}
        >
          show card list
        </Button>
      </div>
    </div>
  </Card>
{/if}
