<script lang="ts">
  import type { Card } from "$lib/type";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import PokemonCard from "./PokemonCard.svelte";

  export let cards: Card[];
  export let cols: number;
  export let isReverse = false;
</script>

<section
  class="grid grid-cols-{cols} px-8 w-full"
  style="min-height: 96px;"
  use:dndzone={{ items: cards, flipDurationMs: 100, dropTargetStyle: {} }}
  on:consider
  on:finalize
>
  {#each cards ?? [] as card (card.id)}
    <div class="-mx-4 -my-0" animate:flip={{ duration: 100 }}>
      <PokemonCard
        item={{ src: card.url, alt: card.id }}
        opacity={false}
        {isReverse}
      />
    </div>
  {/each}
</section>
