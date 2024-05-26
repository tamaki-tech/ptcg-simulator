<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";
  import { Button, Card } from "flowbite-svelte";
  import type { DeckAreaMachineType } from "../../machines/deckAreaMachine";
  import { addToast } from "../../toast";
  import CardListModal from "./CardListModal.svelte";

  export let deckArea: DeckAreaMachineType;

  let openDeckListModal = false;

  const shuffleDeck = () => {
    deckArea.send({ type: "shuffleDeck" });
    addToast("デッキをシャッフルしました"); // TODO machineから実行しなくて良いのか？
  };

  const pickCard = (e: any) => {
    deckArea.send({ type: "pickCard", id: e.detail.id });
    addToast("山札から手札にカードを追加しました");
  };
</script>

{#if $deckArea?.value === "ready"}
  <CardListModal
    deck={$deckArea?.context.deck}
    title={`Deck Card List (${$deckArea?.context.deck?.cards.length})`}
    bind:openModal={openDeckListModal}
    on:shuffleDeck={shuffleDeck}
    on:pickCard={pickCard}
  />

  <Card size="xs" padding="sm">
    <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
      Deck ({$deckArea?.context.deck?.cards.length})
    </h5>

    <img
      alt="poke_ura"
      role="none"
      class="cursor-pointer hover:opacity-80 transition-opacity object-contain h-28 w-full"
      src={pokeUraImg}
      on:click={() => deckArea?.send("dealCards")}
    />

    <section class="py-4">
      <Button
        outline
        size="xs"
        color="light"
        class="max-h-1 w-full"
        on:click={() => (openDeckListModal = true)}
      >
        デッキ確認
      </Button>
      <Button
        outline
        size="xs"
        color="light"
        class="max-h-1 w-full"
        on:click={shuffleDeck}
      >
        シャッフル
      </Button>
      <Button outline size="xs" color="light" class="max-h-1 w-full">
        デッキトップ
      </Button>
    </section>
  </Card>
{/if}
