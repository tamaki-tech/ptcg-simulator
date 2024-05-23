<script lang="ts">
  import { Button, ButtonGroup, Card, Indicator } from "flowbite-svelte";
  import { MinusOutline, PlusOutline } from "flowbite-svelte-icons";
  import { flip } from "svelte/animate";
  import type { PokemonAreaMachineType } from "../../machines/pokemonAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCard.svelte";

  export let pokemonArea: PokemonAreaMachineType;
  export let index: number;

  $: cards = $pokemonArea.context.cards;
  $: damage = $pokemonArea.context.damage;

  const handleconsider = (e: any) => {
    pokemonArea.send({ type: "assignCards", data: e.detail.items });
  };

  const handleFinalize = (e: any) => {
    pokemonArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="md" padding="xs">
  <div class="flex justify-between p-2">
    <div class="pt-1 pr-1">
      <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400">
        Bench{index + 1}
      </h5>
    </div>
    <div>
      <ButtonGroup>
        <Button
          size="sm"
          class="relative"
          color="red"
          outline
          on:click={() => pokemonArea.send({ type: "addDamege" })}
        >
          <PlusOutline size="xs" />
        </Button>
        <Button
          size="sm"
          class="relative"
          color="red"
          outline
          on:click={() => pokemonArea.send({ type: "subDamage" })}
        >
          <MinusOutline size="xs" />
          <Indicator color="red" size="xl" placement="top-right">
            <span class="text-white text-xs font-bold">{damage}</span>
          </Indicator>
        </Button>
      </ButtonGroup>
    </div>
  </div>

  <div class="py-4">
    <DragAndDropSection
      {cards}
      cols={5}
      on:consider={handleconsider}
      on:finalize={handleFinalize}
    >
      {#each cards ?? [] as card (card.id)}
        <div class="-mx-6 -my-0" animate:flip={{ duration: 100 }}>
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
        </div>
      {/each}
    </DragAndDropSection>
  </div>
</Card>
