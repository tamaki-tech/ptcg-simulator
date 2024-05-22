<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { TrushAreaMachineType } from "../../machines/trushAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";

  export let trushArea: TrushAreaMachineType;

  $: cards = $trushArea?.context.cards;

  const handleconsider = (e: any) => {
    trushArea.send({ type: "assignCards", data: e.detail.items });
  };
  const handleFinalize = (e: any) => {
    trushArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="md" padding="md">
  <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
    Trush ({cards.length})
  </h5>
  <DragAndDropSection
    {cards}
    cols={12}
    on:consider={handleconsider}
    on:finalize={handleFinalize}
  />
</Card>
