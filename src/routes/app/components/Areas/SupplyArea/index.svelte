<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Coin from "./Coin.svelte";
  import Vstar from "./Vstar.svelte";
</script>

<Card size="xs" padding="sm">
  <div class="p-1">
    <Vstar />
  </div>
  <div class="p-1">
    <Coin />
  </div>
</Card>
