<script lang="ts">
  import { Modal } from "flowbite-svelte";

  export let openModal = false;
  export let item: { src: string; alt?: string };
</script>

<Modal title="拡大表示" bind:open={openModal} autoclose>
  <img class="max-h-full justify-center px-36" src={item.src} alt={item.alt} />
  <svelte:fragment slot="footer">
    <slot name="footer" />
  </svelte:fragment>
</Modal>
