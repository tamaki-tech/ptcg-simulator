<script lang="ts">
  import { Button, ButtonGroup, Card, DropdownItem } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import type { ActorRefFrom } from "xstate";
  import type { pokemonAreaMachine } from "../../machines/pokemonAreaMachine";
  import { addToast } from "../../toast";
  import DamageCounter from "./components/DamageCounter.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let pokemonArea: ActorRefFrom<typeof pokemonAreaMachine>;

  $: cards = $pokemonArea.context.cards;

  let isPoisoned = false;
  let isBurned = false;
  let isAsleep = false;
  let isConfused = false;

  const handleDragAndDrop = (e: any) => {
    pokemonArea.send({ type: "assignCards", data: e.detail.items });
  };

  const trashAllCards = () => {
    pokemonArea.send({ type: "trashAllCards" });
    addToast("バトル場のカードをトラッシュしました");
  };

  const sendAllCardToHand = () => {
    pokemonArea.send({ type: "sendAllCardToHand" });
    addToast("バトル場のカードを手札に戻しました");
  };

  const trashCard = (id: string) => {
    pokemonArea.send({ type: "trashCard", id });
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

<Card size="lg" padding="xs">
  <section class="flex justify-between p-2">
    <div class="pt-1 pr-1">
      <h5 class="text-sm font-medium text-gray-500 dark:text-gray-400">
        Battle
      </h5>
    </div>
    <div>
      <ButtonGroup size="xs">
        <Button
          outline
          size="xs"
          color="light"
          class="max-h-1"
          on:click={sendAllCardToHand}
        >
          手札に戻す
        </Button>
        <Button
          outline
          size="xs"
          color="light"
          class="max-h-1"
          on:click={trashAllCards}
        >
          トラッシュ
        </Button>
      </ButtonGroup>
    </div>

    <DamageCounter
      damage={$pokemonArea.context.damage}
      on:addDamage={() => pokemonArea.send({ type: "addDamage" })}
      on:subDamage={() => pokemonArea.send({ type: "subDamage" })}
    />
  </section>

  <section class="flex gap-1 justify-center">
    <Button
      pill
      outline={!isPoisoned}
      class="max-h-1"
      color="purple"
      on:click={() => (isPoisoned = !isPoisoned)}
    >
      どく
    </Button>
    <Button
      pill
      outline={!isBurned}
      class="max-h-1"
      color="primary"
      on:click={() => (isBurned = !isBurned)}
    >
      やけど
    </Button>
    <Button
      pill
      outline={!isAsleep}
      class="max-h-1"
      color="blue"
      on:click={() => {
        isAsleep = !isAsleep;
        isConfused = false;
      }}
    >
      ねむり
    </Button>
    <Button
      pill
      outline={!isConfused}
      class="max-h-1"
      color="yellow"
      on:click={() => {
        isConfused = !isConfused;
        isAsleep = false;
      }}
    >
      こんらん
    </Button>
  </section>

  <section class="py-4 px-4">
    <div
      class="flex min-h-24 items-center justify-center"
      use:dndzone={{
        items: cards,
        flipDurationMs: 100,
        dropTargetStyle: {},
        centreDraggedOnCursor: true,
      }}
      on:consider={handleDragAndDrop}
      on:finalize={handleDragAndDrop}
    >
      {#each cards ?? [] as card, i (card.id)}
        <div
          class="relative"
          style="margin-left: {i > 0 ? '-45px' : '0'}; z-index: {i}"
          animate:flip={{ duration: 100 }}
        >
          <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
            <svelte:fragment slot="modalFooterMenu">
              <Button on:click={() => trashCard(card.id)}>
                トラッシュする
              </Button>
              <Button>手札に戻す</Button>
              <Button on:click={() => sendCardToBottom(card.id)}>
                デッキボトムに戻す
              </Button>
              <Button on:click={() => sendCardToTop(card.id)}>
                デッキトップに戻す
              </Button>
            </svelte:fragment>
            <svelte:fragment slot="dropDownMenu">
              <DropdownItem on:click={() => trashCard(card.id)}>
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
    </div>
  </section>
</Card>
