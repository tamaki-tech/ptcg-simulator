<script lang="ts">
  import Vstar from "$lib/images/Vstar.png";
  import VstarUra from "$lib/images/Vstar_ura.png";

  let reverse = false;
</script>

<button on:click={() => (reverse = !reverse)}>
  {#if reverse}
    <img src={VstarUra} alt="vstar_ura" />
  {:else}
    <img src={Vstar} alt="vstar" />
  {/if}
</button>
