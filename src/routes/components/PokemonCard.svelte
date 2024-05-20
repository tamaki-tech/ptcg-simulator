<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";

  export let item: { src: string; alt?: string };
  export let isReverse = false;
  export let opacity = true;
</script>

<div
  class="cursor-pointer transition-opacity {opacity ? 'hover:opacity-80' : ''}"
>
  {#if isReverse}
    <img src={pokeUraImg} alt="pokeUraImage" class="h-auto max-w-full" />
  {:else}
    <img src={item.src} alt={item.alt} class="h-auto max-w-full" />
  {/if}
</div>
