<script lang="ts">
  import { Button, ButtonGroup, Card } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { HandsAreaMachineType } from "../../machines/handsAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCards/PokemonCard.svelte";

  export let handArea: HandsAreaMachineType;

  const handleDragAndDrop = (e: any) => {
    handArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="lg" padding="sm">
  <div class="flex justify-between">
    <div>
      <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Hand ({$handArea.context.cards.length})
      </h5>
    </div>
    <ButtonGroup>
      <Button outline size="xs" color="light" class="max-h-1">
        ナンジャモ
      </Button>
      <Button outline size="xs" color="light" class="max-h-1">博士</Button>
      <Button outline size="xs" color="light" class="max-h-1">
        ジャッジマン
      </Button>
    </ButtonGroup>
  </div>
  <DragAndDropSection
    cards={$handArea.context.cards}
    class="grid-cols-12"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each $handArea.context.cards ?? [] as card (card.id)}
      <div class="-mx-6" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
      </div>
    {/each}
  </DragAndDropSection>
</Card>
