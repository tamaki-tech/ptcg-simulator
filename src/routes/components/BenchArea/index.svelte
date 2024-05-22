<script lang="ts">
  import { Button, ButtonGroup, Card, Indicator } from "flowbite-svelte";
  import { MinusOutline, PlusOutline } from "flowbite-svelte-icons";
  import type { PokemonAreaMachineType } from "../../machines/pokemonAreaMachine";
  import DragAndDropSection from "../DragAndDropSection.svelte";

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
        <Button size="sm" class="relative" color="red" outline>
          <PlusOutline size="xs" />
        </Button>
        <Button size="sm" class="relative" color="red" outline>
          <MinusOutline size="xs" />
          <Indicator color="red" border size="xl" placement="top-right">
            <span class="text-white text-xs font-bold">{damage}</span>
          </Indicator>
        </Button>
      </ButtonGroup>
    </div>
  </div>

  <div class="pt-2 px-4 justify-items-end">
    <DragAndDropSection
      {cards}
      cols={5}
      mx={6}
      on:consider={handleconsider}
      on:finalize={handleFinalize}
    />
  </div>
</Card>
