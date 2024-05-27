<script lang="ts">
  import type { Card } from "$lib/type";
  import { Modal } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import DeckListCard from "./PokemonCards/DeckListCard.svelte";

  const dispatch = createEventDispatcher<{
    trushCard: { id: string };
    pickCard: { id: string };
  }>();

  // TODO refactor
  const defaultDeckTop = 60;

  export let openModal = false;
  export let title: string;
  export let cards: Card[] = [];
  export let deckTop: number = defaultDeckTop;

  $: items = cards
    .map((c) => {
      return { id: c.id, src: c.url, alt: c.id };
    })
    .reverse();

  // デッキリストの表のカードが手札やトラッシュに行った際はめくられるデッキトップ枚数が減るので調整する
  const decrementDeckTop = (index: number) => {
    if (index > deckTop) return;
    deckTop -= 1;
  };

  const pickCard = (e: any, index: number) => {
    dispatch("pickCard", { id: e.detail.id });
    decrementDeckTop(index);
  };

  const trushCard = (e: any, index: number) => {
    dispatch("trushCard", { id: e.detail.id });
    decrementDeckTop(index);
  };
</script>

<Modal
  {title}
  bind:open={openModal}
  size="lg"
  on:close={() => {
    // モーダルが閉じるときにめくるデッキトップの枚数を初期値に戻す
    deckTop = defaultDeckTop;
  }}
>
  <div
    role="none"
    class="grid grid-cols-10 gap-1"
    on:contextmenu|preventDefault
  >
    {#each items ?? [] as item, i}
      {@const isReverse = i > deckTop - 1}
      <DeckListCard
        {item}
        {isReverse}
        on:pickCard={(e) => pickCard(e, i)}
        on:trushCard={(e) => trushCard(e, i)}
      />
    {/each}
  </div>

  <svelte:fragment slot="footer">
    <slot />
  </svelte:fragment>
</Modal>
