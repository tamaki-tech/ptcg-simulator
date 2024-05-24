<script lang="ts">
  import type { Card } from "$lib/type";
  import { dndzone } from "svelte-dnd-action";

  export let cards: Card[];
  export { className as class };
  let className = "";
</script>

<section
  class="grid px-8 {className} place-items-center"
  style="min-height: 96px;"
  use:dndzone={{ items: cards, flipDurationMs: 100, dropTargetStyle: {} }}
  on:consider
  on:finalize
>
  <slot />
</section>
