<script lang="ts">
  import {
    Button,
    ButtonGroup,
    Card,
    DropdownItem,
    Toggle,
  } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { SideAreaMachineType } from "../../machines/sideAreaMachine";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let sideArea: SideAreaMachineType;

  let checked = true;

  $: toggleLabel = checked ? "裏" : "表";

  const handleDragAndDrop = (e: any) => {
    sideArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="sm">
  <div class="flex justify-between">
    <div>
      <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400">
        Side ({$sideArea?.context?.cards?.length})
      </h5>
    </div>
    <div>
      <Toggle size="small" bind:checked>{toggleLabel}</Toggle>
    </div>
  </div>

  <div class="flex flex-col justify-center items-center py-2">
    <ButtonGroup size="xs">
      <Button outline size="xs" color="light" class="max-h-1">1枚</Button>
      <Button outline size="xs" color="light" class="max-h-1">2枚</Button>
    </ButtonGroup>
  </div>

  <DragAndDropSection
    cards={$sideArea?.context.cards}
    class="grid-cols-2"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each $sideArea?.context.cards ?? [] as card (card.id)}
      <div class="-mx-4" animate:flip={{ duration: 100 }}>
        <PokemonCard
          item={{ src: card.url, alt: card.id }}
          opacity={false}
          bind:isReverse={checked}
        >
          <svelte:fragment slot="modalFooterMenu">
            <Button>サイドを取る</Button>
            <Button>裏表を逆にする</Button>
          </svelte:fragment>
          <svelte:fragment slot="dropDownMenu">
            <DropdownItem>サイドを取る</DropdownItem>
            <DropdownItem>裏表を逆にする</DropdownItem>
          </svelte:fragment>
        </PokemonCard>
      </div>
    {/each}
  </DragAndDropSection>
</Card>
