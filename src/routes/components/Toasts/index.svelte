<script lang="ts">
  import { toasts } from "../../toast";
  import Toast from "./Toast.svelte";
</script>

{#if $toasts}
  {#each $toasts as toast}
    <Toast message={toast.message} />
  {/each}
{/if}
