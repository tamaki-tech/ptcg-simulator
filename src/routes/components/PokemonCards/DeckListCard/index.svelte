<script lang="ts">
  import {
    Button,
    Dropdown,
    DropdownDivider,
    DropdownItem,
  } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import CardImage from "../components/CardImage.svelte";
  import CardViewModal from "../components/CardViewModal.svelte";

  const dispatch = createEventDispatcher<{ sendCardToHand: { id: string } }>();

  export let item: { id: string; src: string; alt?: string };
  export let isReverse = false;
  export let opacity = true;

  let openDropDownMenu = false;
  let openModal = false;
</script>

<CardViewModal bind:openModal {item}>
  <svelte:fragment slot="footer">
    <Button color="alternative">閉じる</Button>
    <Button on:click={() => dispatch("sendCardToHand", { id: item.id })}>
      手札に加える
    </Button>
    <Button>トラッシュに送る</Button>
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
  placement="left-start"
  bind:open={openDropDownMenu}
  on:close={() => (openDropDownMenu = false)}
>
  <DropdownItem on:click={() => (openModal = true)}>拡大表示する</DropdownItem>
  <DropdownDivider />
  <DropdownItem
    on:click={() => {
      dispatch("sendCardToHand", { id: item.id });
    }}
  >
    手札に加える
  </DropdownItem>
  <DropdownItem>トラッシュに送る</DropdownItem>
</Dropdown>
