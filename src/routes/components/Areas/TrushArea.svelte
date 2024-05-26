<script lang="ts">
  import { Button, Card, DropdownItem } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { TrushAreaMachineType } from "../../machines/trushAreaMachine";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let trushArea: TrushAreaMachineType;

  const handleDragAndDrop = (e: any) => {
    trushArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="sm">
  <div class="flex justify-between">
    <div>
      <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Trush ({$trushArea?.context.cards.length})
      </h5>
    </div>
    <div>
      <Button outline size="xs" color="light" class="max-h-1">確認</Button>
    </div>
  </div>

  <DragAndDropSection
    cards={$trushArea?.context.cards}
    class="grid-flow-col-dense"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each $trushArea?.context.cards ?? [] as card (card.id)}
      <div class="-mx-7" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
          <svelte:fragment slot="modalFooterMenu">
            <Button>手札に戻す</Button>
            <Button>デッキボトムに戻す</Button>
            <Button>デッキトップに戻す</Button>
          </svelte:fragment>
          <svelte:fragment slot="dropDownMenu">
            <DropdownItem>手札に戻す</DropdownItem>
            <DropdownItem>デッキボトムに戻す</DropdownItem>
            <DropdownItem>デッキトップに戻す</DropdownItem>
          </svelte:fragment>
        </PokemonCard>
      </div>
    {/each}
  </DragAndDropSection>
</Card>