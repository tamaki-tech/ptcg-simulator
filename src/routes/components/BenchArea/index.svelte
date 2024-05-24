<script lang="ts">
  import { Button, ButtonGroup, Card } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import type { PokemonAreaMachineType } from "../../machines/pokemonAreaMachine";
  import DamageCounter from "../DamageCounter.svelte";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCard.svelte";

  const dispatch = createEventDispatcher<{ replacePokemon: void }>();

  export let pokemonArea: PokemonAreaMachineType;
  export let index: number;

  $: cards = $pokemonArea.context.cards;
  $: col = cards.length > 5 ? 5 : cards.length;

  const handleDragAndDrop = (e: any) => {
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
    <DamageCounter
      damage={$pokemonArea.context.damage}
      on:addDamage={() => pokemonArea.send({ type: "addDamege" })}
      on:subDamage={() => pokemonArea.send({ type: "subDamage" })}
    />
  </div>
  <ButtonGroup size="xs">
    <Button
      outline
      size="xs"
      color="light"
      class="max-h-1"
      on:click={() => dispatch("replacePokemon")}>バトル</Button
    >
    <Button outline size="xs" color="light" class="max-h-1">トラッシュ</Button>
  </ButtonGroup>

  <div class="py-4">
    <DragAndDropSection
      {cards}
      class={`grid-cols-${col}`}
      on:consider={handleDragAndDrop}
      on:finalize={handleDragAndDrop}
    >
      {#each cards ?? [] as card (card.id)}
        <div class="col-span-1 -mx-6 -my-0" animate:flip={{ duration: 100 }}>
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
        </div>
      {/each}
    </DragAndDropSection>
  </div>
</Card>
