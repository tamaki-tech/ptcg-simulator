<script lang="ts">
  import { Button, ButtonGroup, Card } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { PokemonAreaMachineType } from "../../machines/pokemonAreaMachine";
  import DamageCounter from "../DamageCounter.svelte";
  import DragAndDropSection from "../DragAndDropSection.svelte";
  import PokemonCard from "../PokemonCard.svelte";

  export let pokemonArea: PokemonAreaMachineType;

  $: cards = $pokemonArea.context.cards;
  $: col = cards.length > 5 ? 5 : cards.length;

  const handleDragAndDrop = (e: any) => {
    pokemonArea.send({ type: "assignCards", data: e.detail.items });
  };
</script>

<Card size="lg" padding="xs">
  <div class="flex justify-between p-2">
    <div class="pt-1 pr-1">
      <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400">
        Battle
      </h5>
    </div>

    <div>
      <ButtonGroup size="xs">
        <Button outline size="xs" color="light" class="max-h-1">
          デッキに戻す
        </Button>
        <Button outline size="xs" color="light" class="max-h-1">
          トラッシュ
        </Button>
      </ButtonGroup>
    </div>

    <DamageCounter
      damage={$pokemonArea.context.damage}
      on:addDamage={() => pokemonArea.send({ type: "addDamege" })}
      on:subDamage={() => pokemonArea.send({ type: "subDamage" })}
    />
  </div>
  <div class="flex gap-1 justify-center">
    <Button outline class="max-h-1" color="purple">どく</Button>
    <Button outline class="max-h-1" color="primary">やけど</Button>
    <Button outline class="max-h-1" color="blue">ねむり</Button>
    <Button outline class="max-h-1" color="yellow">こんらん</Button>
  </div>

  <div class="py-4 px-32">
    <DragAndDropSection
      cards={$pokemonArea.context.cards}
      class="grid-cols-{col}"
      on:consider={handleDragAndDrop}
      on:finalize={handleDragAndDrop}
    >
      {#each $pokemonArea.context.cards ?? [] as card (card.id)}
        <div class="col-span-1 -m-6 -my-0" animate:flip={{ duration: 100 }}>
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false} />
        </div>
      {/each}
    </DragAndDropSection>
  </div>
</Card>
