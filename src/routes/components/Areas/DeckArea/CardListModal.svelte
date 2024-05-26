<script lang="ts">
  import type { Deck } from "$lib/type";
  import { Button, Modal } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import DeckListCard from "../components/PokemonCards/DeckListCard.svelte";

  const dispatch = createEventDispatcher<{
    shuffleDeck: void;
    pickCard: { id: string };
  }>();

  // TODO refactor
  const defaultDeckTop = 60;

  export let openModal = false;
  export let title: string;
  export let deck: Deck | undefined;
  export let deckTop: number = defaultDeckTop;

  $: items = deck?.cards
    .map((c) => {
      return { id: c.id, src: c.url, alt: c.id };
    })
    .reverse();

  const closeModal = () => {
    openModal = false;
  };

  const shuffleDeck = () => {
    dispatch("shuffleDeck");
    closeModal();
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
      <DeckListCard {item} on:pickCard on:trushCard {isReverse} />
    {/each}
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={shuffleDeck}>シャッフルして閉じる</Button>
    <Button on:click={closeModal} color="alternative">閉じる</Button>
  </svelte:fragment>
</Modal>
