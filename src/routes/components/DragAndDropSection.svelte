<script lang="ts">
  import type { Card } from "$lib/type";
  import { dndzone } from "svelte-dnd-action";

  export let cards: Card[];
  export let cols: number;

  $: gridCols = `grid-cols-${cols}`;
</script>

<section
  class="grid {gridCols} px-8 items-center"
  style="min-height: 96px;"
  use:dndzone={{ items: cards, flipDurationMs: 100, dropTargetStyle: {} }}
  on:consider
  on:finalize
>
  <slot />
</section>
