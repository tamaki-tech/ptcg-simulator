<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";

  export let openModal = false;
  export let item: { src: string; alt?: string };
</script>

<Modal title="拡大表示" bind:open={openModal} autoclose>
  <img class="max-h-full justify-center px-36" src={item.src} alt={item.alt} />
  <svelte:fragment slot="footer">
    <Button color="alternative">閉じる</Button>
    <Button>デッキボトムに戻す</Button>
    <Button>デッキトップに戻す</Button>
  </svelte:fragment>
</Modal>
