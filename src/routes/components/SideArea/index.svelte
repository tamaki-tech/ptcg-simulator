<script lang="ts">
  import { Card, Toggle } from "flowbite-svelte";
  import type { SideAreaMachineType } from "../../machines/sideAreaMachine";
  import PokemonCard from "../PokemonCard.svelte";

  export let sideArea: SideAreaMachineType;

  let checked = true;

  $: toggleLabel = checked ? "back" : "front";
</script>

<Card size="xs" padding="lg">
  <h5 class="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">
    Side ({$sideArea?.context?.cards?.length})
  </h5>
  <div class="grid grid-cols-2 mx-8">
    {#each $sideArea?.context?.cards ?? [] as card}
      <div class="-mx-4">
        <PokemonCard
          item={{ src: card.url, alt: card.id }}
          opacity={false}
          isReverse={checked}
        />
      </div>
    {/each}
  </div>
  <div class="p-4">
    <Toggle size="small" bind:checked>{toggleLabel}</Toggle>
  </div>
</Card>
