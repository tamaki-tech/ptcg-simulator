<script lang="ts">
  import { Button, ButtonGroup, Indicator } from "flowbite-svelte";
  import { MinusOutline, PlusOutline } from "flowbite-svelte-icons";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    addDamage: void;
    subDamage: void;
  }>();

  export let damage: number;
</script>

<div>
  <ButtonGroup>
    <Button
      size="sm"
      class="relative max-w-10 max-h-7"
      color="red"
      outline
      on:click={() => dispatch("addDamage")}
    >
      <PlusOutline size="xs" />
    </Button>
    <Button
      size="sm"
      class="relative max-w-10 max-h-7"
      color="red"
      outline
      on:click={() => dispatch("subDamage")}
    >
      <MinusOutline size="xs" />
      {#if damage > 0}
        <Indicator color="red" size="xl" placement="top-right">
          <span class="text-white text-xs font-bold">{damage}</span>
        </Indicator>
      {/if}
    </Button>
  </ButtonGroup>
</div>
