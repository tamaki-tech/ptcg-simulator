<script lang="ts">
  import { Card } from "flowbite-svelte";
  import type { PokemonAreaMachineType } from "../../machines/pokemonAreaMachine";
  import { ButtonGroup, Button, Input } from "flowbite-svelte";
  import { PlusOutline, MinusOutline } from "flowbite-svelte-icons";

  export let pokemonArea: PokemonAreaMachineType;
  export let index: number;
</script>

<Card size="xs" padding="xs">
  <h5 class="text-lg font-medium text-gray-500 dark:text-gray-400">
    Bench {index + 1}
  </h5>
  <div class="flex p-2 justify-between">
    <div>
      <ButtonGroup class="w-16" size="sm">
        <Input color="red" id="input-addon-sm" />
      </ButtonGroup>
    </div>
    <div>
      <ButtonGroup>
        <Button pill size="xs" outline color="red">
          <PlusOutline size="xs" />
        </Button>
        <Button pill size="xs" outline color="red">
          <MinusOutline size="xs" />
        </Button>
      </ButtonGroup>
    </div>
  </div>

  <div class="flex px-2">
    <ButtonGroup size="xs">
      <Button size="xs">Battle</Button>
      <Button size="xs">Trush</Button>
    </ButtonGroup>
  </div>
</Card>
