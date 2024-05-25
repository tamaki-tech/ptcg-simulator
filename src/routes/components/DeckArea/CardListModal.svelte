<script lang="ts">
  import type { Deck } from "$lib/type";
  import { Button, Modal } from "flowbite-svelte";
  import PokemonCard from "../PokemonCards/PokemonCard/index.svelte";

  export let openModal = false;
  export let title: string;
  export let deck: Deck | undefined;

  $: items = deck?.cards
    .map((c) => {
      return { src: c.url, alt: c.id };
    })
    .reverse();
</script>

<Modal {title} bind:open={openModal} size="lg">
  <div class="grid grid-cols-10 gap-1">
    {#each items ?? [] as item}
      <div class="cursor-pointer">
        <PokemonCard {item} />
      </div>
    {/each}
  </div>

  <svelte:fragment slot="footer">
    <Button>シャッフルして閉じる</Button>
    <Button color="alternative">閉じる</Button>
  </svelte:fragment>
</Modal>
