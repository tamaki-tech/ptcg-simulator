<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ contextmenu: void }>();

  export let item: { src: string; alt?: string };
  export let opacity = false;
  export let reverse = false;
</script>

<div
  class="cursor-pointer transition-opacity {opacity ? 'hover:opacity-80' : ''}"
  role="none"
  on:click
  on:contextmenu|preventDefault={() => dispatch("contextmenu")}
>
  {#if reverse}
    <img src={pokeUraImg} alt="pokeUraImage" class="h-24 min-w-18" />
  {:else}
    <img src={item.src} alt={item.alt} class="h-24 min-w-18" />
  {/if}
</div>
