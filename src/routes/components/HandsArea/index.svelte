<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { HandsAreaMachineType } from "../../machines/handsAreaMachine";
  import PokemonCard from "../PokemonCard.svelte";

  export let handArea: HandsAreaMachineType;
</script>

<Card size="md" padding="lg">
  <h5 class="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">
    Hands ({$handArea?.context.cards.length})
  </h5>
  <div class="grid grid-cols-8 mx-12 w-80">
    {#each $handArea?.context?.cards ?? [] as card}
      <div class="-m-4 py-4">
        <PokemonCard item={{ src: card.url, alt: card.uuid }} opacity={false} />
      </div>
    {/each}
  </div>
</Card>
