<script lang="ts">
  import {
    Button,
    Dropdown,
    DropdownDivider,
    DropdownItem,
  } from "flowbite-svelte";
  import CardImage from "./components/CardImage.svelte";
  import CardViewModal from "./components/CardViewModal.svelte";

  export let item: { src: string; alt?: string };
  export let isReverse = false;
  export let opacity = true;

  let openDropDownMenu = false;
  let openModal = false;
</script>

<CardViewModal bind:openModal {item}>
  <svelte:fragment slot="footer">
    <Button color="alternative">閉じる</Button>
    <slot name="modalFooterMenu" />
  </svelte:fragment>
</CardViewModal>

<CardImage
  {item}
  {opacity}
  reverse={isReverse}
  on:click={() => (openDropDownMenu = true)}
  on:contextmenu={() => (openDropDownMenu = true)}
/>

<Dropdown
  placement="right-start"
  bind:open={openDropDownMenu}
  on:close={() => (openDropDownMenu = false)}
>
  <DropdownItem on:click={() => (openModal = true)}>拡大表示する</DropdownItem>
  <DropdownDivider />
  <slot name="dropDownMenu" />
</Dropdown>
