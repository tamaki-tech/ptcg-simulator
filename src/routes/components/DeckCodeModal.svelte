<script lang="ts">
  import { Button, Input, Label, Modal, Spinner } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ click: string }>();

  export let loading = false;

  let value = "";
</script>

<Modal open size="xs" autoclose={false} dismissable={false} class="w-full">
  <form class="flex flex-col space-y-8" action="#">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white">
      デッキコードを入力してください
    </h3>
    <Label class="space-y-2">
      <Input
        type="text"
        name="code"
        placeholder="4YDDca-bzpj9J-cx8KcY"
        required
        disabled={loading}
        bind:value
      />
    </Label>

    <!-- TODO use zod validation -->
    <Button
      class="w-full1"
      disabled={loading || !value}
      on:click={() => dispatch("click", value)}
    >
      {#if loading}
        <Spinner class="mx-4" size="5" color="white" />
      {:else}
        デッキを読み込む
      {/if}
    </Button>
  </form>
</Modal>
