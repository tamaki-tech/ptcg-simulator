<script lang="ts">
  import { Card, Toggle } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { SideAreaMachineType } from "../../machines/sideAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCard.svelte";

  export let sideArea: SideAreaMachineType;

  let checked = true;

  $: cards = $sideArea?.context.cards;
  $: toggleLabel = checked ? "back" : "front";

  const handleconsider = (e: any) => {
    sideArea.send({ type: "assignCards", data: e.detail.items });
  };

  const handleFinalize = (e: any) => {
    sideArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="xs">
  <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
    Side ({$sideArea?.context?.cards?.length})
  </h5>
  <DragAndDropSection
    {cards}
    cols={2}
    mx={1}
    on:consider={handleconsider}
    on:finalize={handleFinalize}
  >
    {#each cards ?? [] as card (card.id)}
      <div class="-mx-2" animate:flip={{ duration: 100 }}>
        <PokemonCard
          item={{ src: card.url, alt: card.id }}
          opacity={false}
          bind:isReverse={checked}
        />
      </div>
    {/each}
  </DragAndDropSection>
  <div class="p-4">
    <Toggle size="small" bind:checked>{toggleLabel}</Toggle>
  </div>
</Card>
