<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { CheckCircleSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  export let message = "";

  let open = true;

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const timeout = async () => {
    await sleep(2000);
    open = false;
  };

  onMount(() => {
    open = true;
    timeout();
  });
</script>

<!-- TODO z-indexこれで本当に大丈夫か？ -->
<div class="flex gap-10" style="z-index: 100;">
  <Toast
    color="green"
    class="fixed"
    dismissable={false}
    transition={slide}
    position="top-right"
    bind:open
  >
    <CheckCircleSolid slot="icon" class="w-5 h-5" />
    {message}
  </Toast>
</div>
