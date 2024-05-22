<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import type { HandsAreaMachineType } from "../../machines/handsAreaMachine";
  import PokemonCard from "../PokemonCard.svelte";

  export let handArea: HandsAreaMachineType;

  $: cards = $handArea.context.cards;

  const handleCardsSort = (e: any) => {
    handArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="md" padding="md">
  <h5 class="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">
    Hand ({cards.length})
  </h5>
  <!-- TODO dndzoneを共通化できるか検討する　-->
  <section
    class="grid grid-cols-12 px-8 w-full"
    use:dndzone={{ items: cards, flipDurationMs: 100, dropTargetStyle: {} }}
    on:consider={handleCardsSort}
    on:finalize={handleCardsSort}
  >
    {#each cards ?? [] as card (card.id)}
      <div class="-mx-4 -my-0" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
      </div>
    {/each}
  </section>
</Card>
