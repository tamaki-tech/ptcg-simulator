<script lang="ts">
  import { Button, Card } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { StadiumAreaMachineType } from "../../machines/stadiumAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCard.svelte";

  export let stadiumArea: StadiumAreaMachineType;

  const handleDragAndDrop = (e: any) => {
    stadiumArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="sm">
  <div class="p-2">
    <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
      Stadium ({$stadiumArea?.context.cards.length})
    </h5>
    <div>
      <Button outline size="xs" color="light" class="max-h-1 w-50">
        トラッシュ
      </Button>
    </div>
  </div>

  <DragAndDropSection
    cards={$stadiumArea?.context.cards}
    class="grid-cols-2"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each $stadiumArea?.context.cards ?? [] as card (card.id)}
      <div class="-mx-3" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
      </div>
    {/each}
  </DragAndDropSection>
</Card>
