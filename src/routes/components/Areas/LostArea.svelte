<script lang="ts">
  import { Button, Card, DropdownItem } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { LostAreaMachineType } from "../../machines/lostAreaMachine";
  import CardListModal from "./components/CardListModal.svelte";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let lostArea: LostAreaMachineType;

  let openModal = false;

  $: cards = $lostArea.context.cards;

  const handleDragAndDrop = (e: any) => {
    lostArea.send({ type: "assignCards", data: e.detail.items });
  };

  const pickCard = (id: string) => {
    lostArea.send({ type: "pickCard", id: id });
  };
</script>

<CardListModal title={`Trush (${cards.length})`} {cards} bind:openModal>
  <Button on:click={() => (openModal = false)} color="alternative">
    閉じる
  </Button>
</CardListModal>

<Card size="xs" padding="sm">
  <div class="flex justify-between">
    <div>
      <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Lost ({cards.length})
      </h5>
    </div>
    <div>
      <Button
        outline
        disabled={cards.length <= 0}
        size="xs"
        color="light"
        class="max-h-1"
        on:click={() => (openModal = true)}
      >
        確認
      </Button>
    </div>
  </div>

  <DragAndDropSection
    {cards}
    class="grid-flow-col-dense"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each cards ?? [] as card (card.id)}
      <div class="-mx-7" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
          <svelte:fragment slot="modalFooterMenu">
            <Button on:click={() => pickCard(card.id)}>手札に戻す</Button>
            <Button>デッキボトムに戻す</Button>
            <Button>デッキトップに戻す</Button>
          </svelte:fragment>
          <svelte:fragment slot="dropDownMenu">
            <DropdownItem on:click={() => pickCard(card.id)}>
              手札に戻す
            </DropdownItem>
            <DropdownItem>デッキボトムに戻す</DropdownItem>
            <DropdownItem>デッキトップに戻す</DropdownItem>
          </svelte:fragment>
        </PokemonCard>
      </div>
    {/each}
  </DragAndDropSection>
</Card>
