<script lang="ts">
  import { Button, ButtonGroup, Card, DropdownItem } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import type { ActorRefFrom } from "xstate";
  import type { pokemonAreaMachine } from "../../machines/pokemonAreaMachine";
  import { addToast } from "../../toast";
  import DamageCounter from "./components/DamageCounter.svelte";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  const dispatch = createEventDispatcher<{ replacePokemon: void }>();

  export let pokemonArea: ActorRefFrom<typeof pokemonAreaMachine>;
  export let index: number;

  $: cards = $pokemonArea.context.cards;
  $: col = cards.length > 5 ? 5 : cards.length;

  const handleDragAndDrop = (e: any) => {
    pokemonArea.send({ type: "assignCards", data: e.detail.items });
  };

  const trushAllCards = () => {
    pokemonArea.send({ type: "trushAllCards" });
    addToast(`ベンチ${index + 1}のカードを全てトラッシュしました`);
  };

  const trushCard = (id: string) => {
    pokemonArea.send({ type: "trushCard", id });
    addToast("カードをトラッシュしました");
  };

  const sendCardToTop = (id: string) => {
    pokemonArea.send({ type: "sendCardToTop", id });
    addToast("カードをデッキ上に送りました");
  };

  const sendCardToBottom = (id: string) => {
    pokemonArea.send({ type: "sendCardToBottom", id });
    addToast("カードをデッキ下に送りました");
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
      on:click={() => dispatch("replacePokemon")}
    >
      バトル
    </Button>
    <Button
      outline
      size="xs"
      color="light"
      class="max-h-1"
      on:click={trushAllCards}
    >
      トラッシュ
    </Button>
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
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
            <svelte:fragment slot="modalFooterMenu">
              <Button on:click={() => trushCard(card.id)}>
                トラッシュする
              </Button>
              <Button on:click={() => sendCardToBottom(card.id)}>
                デッキボトムに戻す
              </Button>
              <Button on:click={() => sendCardToTop(card.id)}>
                デッキトップに戻す
              </Button>
            </svelte:fragment>
            <svelte:fragment slot="dropDownMenu">
              <DropdownItem on:click={() => trushCard(card.id)}>
                トラッシュする
              </DropdownItem>
              <DropdownItem on:click={() => sendCardToBottom(card.id)}>
                デッキボトムに戻す
              </DropdownItem>
              <DropdownItem on:click={() => sendCardToTop(card.id)}>
                デッキトップに戻す
              </DropdownItem>
            </svelte:fragment>
          </PokemonCard>
        </div>
      {/each}
    </DragAndDropSection>
  </div>
</Card>
