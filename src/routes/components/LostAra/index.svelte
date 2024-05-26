<script lang="ts">
  import { Button, Card } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { LostAreaMachineType } from "../../machines/lostAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCards/PokemonCard.svelte";

  export let lostArea: LostAreaMachineType;

  const handleDragAndDrop = (e: any) => {
    lostArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="sm">
  <div class="flex justify-between">
    <div>
      <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Lost ({$lostArea?.context.cards.length})
      </h5>
    </div>
    <div>
      <Button outline size="xs" color="light" class="max-h-1">確認</Button>
    </div>
  </div>

  <DragAndDropSection
    cards={$lostArea?.context.cards}
    class="grid-flow-col-dense"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each $lostArea?.context.cards ?? [] as card (card.id)}
      <div class="-mx-7" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
      </div>
    {/each}
  </DragAndDropSection>
</Card>
