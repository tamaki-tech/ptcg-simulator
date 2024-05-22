<script lang="ts">
  import { Card, Toggle } from "flowbite-svelte";
  import type { SideAreaMachineType } from "../../machines/sideAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";

  export let sideArea: SideAreaMachineType;

  let checked = true;

  $: cards = $sideArea?.context.cards;
  $: toggleLabel = checked ? "back" : "front";

  const handleconsider = (e: any) => {
    sideArea.send({ type: "assignCards", data: e.detail.items });
  };

  const handleFinalize = (e: any) => {
    sideArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="xs" padding="lg">
  <h5 class="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">
    Side ({$sideArea?.context?.cards?.length})
  </h5>
  <DragAndDropSection
    {cards}
    cols={2}
    isReverse={checked}
    on:consider={handleconsider}
    on:finalize={handleFinalize}
  />
  <div class="p-4">
    <Toggle size="small" bind:checked>{toggleLabel}</Toggle>
  </div>
</Card>
