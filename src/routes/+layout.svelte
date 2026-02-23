<script lang="ts">
  import { page } from "$app/stores";
  import "../app.css";
</script>

{#if $page.url.pathname === "/"}
  <div class="flex flex-col min-h-screen">
    <slot />
  </div>
{:else}
  <div class="dark flex flex-col min-h-screen bg-slate-900">
    <main class="flex flex-1 flex-col p-8 w-[1024px] max-w-5xl m-auto box-border">
      <slot />
    </main>
  </div>
{/if}
