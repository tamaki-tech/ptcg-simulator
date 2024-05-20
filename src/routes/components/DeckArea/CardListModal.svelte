<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import type { Deck } from "$lib/type";
  import { Gallery } from "flowbite-svelte";
  import PokemonCard from "../PokemonCard.svelte";

  export let openModal = false;
  export let title: string;
  export let deck: Deck | undefined;

  $: items = deck?.cards
    .map((c) => {
      return { src: c.url, alt: c.uuid };
    })
    .reverse();
</script>

<Modal {title} bind:open={openModal} size="lg" autoclose>
  <Gallery class="gap-4 grid-cols-7" {items} let:item>
    <div class="cursor-pointer">
      <PokemonCard {item} />
    </div>
  </Gallery>
  <svelte:fragment slot="footer">
    <Button>shuffle and close</Button>
    <Button color="alternative">close</Button>
  </svelte:fragment>
</Modal>
