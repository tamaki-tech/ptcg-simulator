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

  const dispatch = createEventDispatcher<{
    pickCard: { id: string };
    trushCard: { id: string };
  }>();

  export let item: { id: string; src: string; alt?: string };
  export let isReverse = false;
  export let opacity = true;

  let openDropDownMenu = false;
  let openModal = false;

  const pickCard = () => {
    dispatch("pickCard", { id: item.id });
  };

  const trushCard = () => {
    dispatch("trushCard", { id: item.id });
  };
</script>

<CardViewModal bind:openModal {item}>
  <svelte:fragment slot="footer">
    <Button color="alternative">閉じる</Button>
    <Button on:click={pickCard}>手札に加える</Button>
    <Button on:click={trushCard}>トラッシュに送る</Button>
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
      pickCard();
      openDropDownMenu = false;
    }}
  >
    手札に加える
  </DropdownItem>
  <DropdownItem
    on:click={() => {
      trushCard();
      openDropDownMenu = false;
    }}
  >
    トラッシュに送る
  </DropdownItem>
</Dropdown>
