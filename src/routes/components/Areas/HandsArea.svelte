<script lang="ts">
  import { Button, ButtonGroup, Card, DropdownItem } from "flowbite-svelte";
  import { flip } from "svelte/animate";
  import type { ActorRefFrom } from "xstate";
  import type { handsAreaMachine } from "../../machines/handsAreaMachine";
  import { addToast } from "../../toast";
  import DragAndDropSection from "./components/DragAndDropSection.svelte";
  import PokemonCard from "./components/PokemonCards/PokemonCard.svelte";

  export let handArea: ActorRefFrom<typeof handsAreaMachine>;

  $: cards = $handArea.context.cards;

  const handleDragAndDrop = (e: any) => {
    handArea.send({ type: "assignCards", data: e.detail.items });
  };

  const trushCard = (id: string) => {
    handArea.send({ type: "trushCard", id });
    addToast("手札を１枚トラッシュしました");
  };

  const trushAllHand = () => {
    handArea.send({ type: "trushAllHand" });
    addToast("手札を全てトラッシュしました");
  };

  const sendAllHandToDeckBottom = () => {
    handArea.send({ type: "sendToDeckBottom" });
    addToast("手札をシャッフルしてデッキボトムに戻しました");
  };

  const sendAllHandToDeckTop = () => {
    handArea.send({ type: "sendToDeckTop" });
    addToast("手札をシャッフルしてデッキトップに戻しました");
  };
</script>

<Card size="lg" padding="sm">
  <div class="flex justify-between mb-2">
    <div>
      <h5 class="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Hand ({cards.length})
      </h5>
    </div>
    <div>
      <!-- TODO #40で対応する　-->
      <!-- <div>
        <ButtonGroup>
          <Button outline size="xs" color="light" class="max-h-1">
            ナンジャモ
          </Button>
          <Button outline size="xs" color="light" class="max-h-1">博士</Button>
          <Button outline size="xs" color="light" class="max-h-1">
            ジャッジマン
          </Button>
        </ButtonGroup>
      </div> -->
      <div>
        <ButtonGroup>
          <Button
            outline
            size="xs"
            color="light"
            class="max-h-1"
            disabled={cards.length <= 0}
            on:click={trushAllHand}
          >
            トラッシュ
          </Button>
          <Button
            outline
            size="xs"
            color="light"
            class="max-h-1"
            disabled={cards.length <= 0}
            on:click={sendAllHandToDeckTop}
          >
            デッキ上
          </Button>
          <Button
            outline
            size="xs"
            color="light"
            class="max-h-1"
            disabled={cards.length <= 0}
            on:click={sendAllHandToDeckBottom}
          >
            デッキ下
          </Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
  <DragAndDropSection
    {cards}
    class="grid-cols-12"
    on:consider={handleDragAndDrop}
    on:finalize={handleDragAndDrop}
  >
    {#each cards ?? [] as card (card.id)}
      <div class="-mx-6" animate:flip={{ duration: 100 }}>
        <PokemonCard item={{ src: card.url, alt: card.id }} opacity={false}>
          <svelte:fragment slot="modalFooterMenu">
            <Button on:click={() => trushCard(card.id)}>トラッシュする</Button>
            <Button>デッキボトムに戻す</Button>
            <Button>デッキトップに戻す</Button>
          </svelte:fragment>
          <svelte:fragment slot="dropDownMenu">
            <DropdownItem on:click={() => trushCard(card.id)}>
              トラッシュする
            </DropdownItem>
            <DropdownItem>デッキボトムに戻す</DropdownItem>
            <DropdownItem>デッキトップに戻す</DropdownItem>
          </svelte:fragment>
        </PokemonCard>
      </div>
    {/each}
  </DragAndDropSection>
</Card>
