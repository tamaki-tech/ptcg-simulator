<script lang="ts">
  import { Button, Card, DropdownItem } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { ActorRefFrom } from "xstate";
  import type { stadiumAreaMachine } from "../../machines/stadiumAreaMachine";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let stadiumArea: ActorRefFrom<typeof stadiumAreaMachine>;

  $: cards = $stadiumArea.context.cards;
  $: col = cards.length > 2 ? 2 : cards.length;

  const handleDragAndDrop = (e: any) => {
    stadiumArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="sm">
  <div class="flex justify-between">
    <h5 class="mb-4 p-1 text-sm font-medium text-gray-500 dark:text-gray-400">
      Stadium
    </h5>
    <div>
      <Button outline size="xs" color="light" class="max-h-1 w-50">
        トラッシュ
      </Button>
    </div>
  </div>

  <div class="py-4">
    <DragAndDropSection
      {cards}
      class={`grid-cols-${col}`}
      on:consider={handleDragAndDrop}
      on:finalize={handleDragAndDrop}
    >
      {#each cards ?? [] as card (card.id)}
        <div class="col-span-1 -mx-6 -my-0" animate:flip={{ duration: 100 }}>
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
            <svelte:fragment slot="modalFooterMenu">
              <Button>トラッシュする</Button>
            </svelte:fragment>
            <svelte:fragment slot="dropDownMenu">
              <DropdownItem>トラッシュする</DropdownItem>
            </svelte:fragment>
          </PokemonCard>
        </div>
      {/each}
    </DragAndDropSection>
  </div>
</Card>
