<script lang="ts">
  import type { Card } from "$lib/type";
  import { dndzone } from "svelte-dnd-action";

  export let cards: Card[];
  export let cols = 12;
</script>

<section
  class="grid grid-cols-{cols} px-8 items-center"
  style="min-height: 96px;"
  use:dndzone={{ items: cards, flipDurationMs: 100, dropTargetStyle: {} }}
  on:consider
  on:finalize
>
  <slot />
</section>
