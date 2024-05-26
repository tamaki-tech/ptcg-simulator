<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    chooseDeckTop: { deckTop: number };
  }>();

  export let openModal = false;
</script>

<Modal title="デッキトップをめくる" bind:open={openModal} size="xs" autoclose>
  {#each Array(7) as _, i}
    {@const deckTop = i + 1}
    <div>
      <Button
        outline
        class="w-full"
        on:click={() => dispatch("chooseDeckTop", { deckTop })}
      >
        {deckTop}枚めくる
      </Button>
    </div>
  {/each}

  <svelte:fragment slot="footer">
    <Button color="alternative">閉じる</Button>
  </svelte:fragment>
</Modal>
