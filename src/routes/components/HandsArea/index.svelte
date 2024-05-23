<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { HandsAreaMachineType } from "../../machines/handsAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCard.svelte";

  export let handArea: HandsAreaMachineType;

  $: cards = $handArea.context.cards;

  const handleconsider = (e: any) => {
    handArea.send({ type: "assignCards", data: e.detail.items });
  };
  const handleFinalize = (e: any) => {
    handArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="md" padding="sm">
  <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
    Hand ({cards.length})
  </h5>
  <div class="">
    <DragAndDropSection
      {cards}
      cols={12}
      on:consider={handleconsider}
      on:finalize={handleFinalize}
    >
      {#each cards ?? [] as card (card.id)}
        <div class="-mx-4" animate:flip={{ duration: 100 }}>
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
        </div>
      {/each}
    </DragAndDropSection>
  </div>
</Card>
