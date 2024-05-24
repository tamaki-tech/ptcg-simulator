<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";
  import { Button, Card } from "flowbite-svelte";
  import type { DeckAreaMachineType } from "../../machines/deckAreaMachine";
  import CardListModal from "./CardListModal.svelte";

  export let deckArea: DeckAreaMachineType | undefined;

  let openDeckListModal = false;
</script>

{#if $deckArea?.value === "ready"}
  <CardListModal
    deck={$deckArea?.context.deck}
    title={`Deck Card List (${$deckArea?.context.deck?.cards.length})`}
    bind:openModal={openDeckListModal}
  />

  <Card size="xs" padding="sm">
    <div class="flex justify-between">
      <div>
        <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          Deck ({$deckArea?.context.deck?.cards.length})
        </h5>
      </div>
      <div>
        <Button
          outline
          size="xs"
          color="light"
          class="max-h-1"
          on:click={() => (openDeckListModal = true)}
        >
          確認
        </Button>
      </div>
    </div>

    <div>
      <img
        alt="poke_ura"
        role="none"
        class="cursor-pointer hover:opacity-80 transition-opacity object-contain h-24 w-full"
        src={pokeUraImg}
        on:click={() => deckArea?.send("dealCards")}
      />
    </div>

    <div class="py-4">
      <Button
        outline
        size="xs"
        color="light"
        class="max-h-1 w-full"
        on:click={() => deckArea?.send({ type: "shuffleDeck" })}
      >
        シャッフル
      </Button>
      <Button outline size="xs" color="light" class="max-h-1 w-full">
        デッキトップ
      </Button>
    </div>
  </Card>
{/if}
