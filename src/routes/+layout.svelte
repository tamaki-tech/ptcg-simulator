<script lang="ts">
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
  <main class="flex flex-1 flex-col p-4 w-full max-w-5xl m-auto box-border">
    <slot />
  </main>

  <footer class="flex flex-col justify-center items-center p-4">
    <p>&copy; tamaki_tech 2024</p>
  </footer>
</div>
