<script lang="ts">
  import pokeUraImg from "$lib/images/poke_ura.jpg";
  import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-svelte";
  import CardViewModal from "./CardViewModal.svelte";

  export let item: { src: string; alt?: string };
  export let isReverse = false;
  export let opacity = true;

  let openDropDownMenu = false;
  let openModal = false;
</script>

<CardViewModal bind:openModal {item} />

<div
  class="cursor-pointer transition-opacity {opacity ? 'hover:opacity-80' : ''}"
  role="none"
  on:click={() => (openDropDownMenu = true)}
  on:contextmenu|preventDefault={() => (openDropDownMenu = true)}
>
  {#if isReverse}
    <img src={pokeUraImg} alt="pokeUraImage" class="h-24 min-w-18" />
  {:else}
    <img src={item.src} alt={item.alt} class="h-24 min-w-18" />
  {/if}
</div>

<Dropdown
  placement="right-start"
  bind:open={openDropDownMenu}
  on:close={() => (openDropDownMenu = false)}
>
  <DropdownItem on:click={() => (openModal = true)}>拡大表示する</DropdownItem>
  <DropdownDivider />
  <DropdownItem>デッキトップに戻す</DropdownItem>
  <DropdownItem>デッキボトムに戻す</DropdownItem>
</Dropdown>
