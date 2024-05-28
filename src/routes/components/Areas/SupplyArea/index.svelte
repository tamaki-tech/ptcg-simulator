<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Coin from "./Coin.svelte";
  import Vstar from "./Vstar.svelte";
</script>

<Card size="xs" padding="sm">
  <div class="p-4">
    <Vstar />
  </div>
  <div class="p-4">
    <Coin />
  </div>
</Card>
