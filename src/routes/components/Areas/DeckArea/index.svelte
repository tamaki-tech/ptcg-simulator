<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";
  import { Button, Card } from "flowbite-svelte";
  import type { DeckAreaMachineType } from "../../../machines/deckAreaMachine";
  import { addToast } from "../../../toast";
  import CardListModal from "./CardListModal.svelte";
  import DeckTopNumberModal from "./DeckTopNumberModal.svelte";

  export let deckArea: DeckAreaMachineType;

  let openDeckListModal = false;
  let openDeckTopListModal = false;
  let deckTop = 60;

  const shuffleDeck = () => {
    deckArea.send({ type: "shuffleDeck" });
    addToast("デッキをシャッフルしました"); // TODO machineから実行しなくて良いのか？
  };

  const pickCard = (e: any) => {
    deckArea.send({ type: "pickCard", id: e.detail.id });
    addToast("デッキから手札にカードを追加しました");
  };

  const trushCard = (e: any) => {
    deckArea.send({ type: "trushCard", id: e.detail.id });
    addToast("デッキからカードを１枚トラッシュしました");
  };
</script>

{#if $deckArea?.value === "ready"}
  <CardListModal
    deck={$deckArea?.context.deck}
    title={`Deck Card List (${$deckArea?.context.deck?.cards.length})`}
    bind:openModal={openDeckListModal}
    bind:deckTop
    on:shuffleDeck={shuffleDeck}
    on:pickCard={pickCard}
    on:trushCard={trushCard}
  />

  <DeckTopNumberModal
    bind:openModal={openDeckTopListModal}
    on:chooseDeckTop={(e) => {
      deckTop = e.detail.deckTop;
      openDeckListModal = true;
    }}
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
      <Button
        outline
        size="xs"
        color="light"
        class="max-h-1 w-full"
        on:click={() => (openDeckTopListModal = true)}
      >
        デッキトップ
      </Button>
    </section>
  </Card>
{/if}
