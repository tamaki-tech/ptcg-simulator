<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { HandsAreaMachineType } from "../../machines/handsAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";

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
  <DragAndDropSection
    {cards}
    cols={12}
    on:consider={handleconsider}
    on:finalize={handleFinalize}
  />
</Card>
