<script lang="ts">
  import { Button, ButtonGroup, Card, DropdownItem } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { HandsAreaMachineType } from "../../machines/handsAreaMachine";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let handArea: HandsAreaMachineType;

  const handleDragAndDrop = (e: any) => {
    handArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="lg" padding="sm">
  <div class="flex justify-between mb-2">
    <div>
      <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Hand ({$handArea.context.cards.length})
      </h5>
    </div>
    <div>
      <div>
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
      <div>
        <ButtonGroup>
          <Button outline size="xs" color="light" class="max-h-1">
            トラッシュ
          </Button>
          <Button outline size="xs" color="light" class="max-h-1">
            デッキ上
          </Button>
          <Button outline size="xs" color="light" class="max-h-1">
            デッキ下
          </Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
  <DragAndDropSection
    cards={$handArea.context.cards}
    class="grid-cols-12"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each $handArea.context.cards ?? [] as card (card.id)}
      <div class="-mx-6" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
          <svelte:fragment slot="modalFooterMenu">
            <Button>トラッシュする</Button>
            <Button>デッキボトムに戻す</Button>
            <Button>デッキトップに戻す</Button>
          </svelte:fragment>
          <svelte:fragment slot="dropDownMenu">
            <DropdownItem>トラッシュする</DropdownItem>
            <DropdownItem>デッキボトムに戻す</DropdownItem>
            <DropdownItem>デッキトップに戻す</DropdownItem>
          </svelte:fragment>
        </PokemonCard>
      </div>
    {/each}
  </DragAndDropSection>
</Card>
