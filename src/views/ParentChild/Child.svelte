<script lang="ts">
  import Button from "@/components/Button.svelte";
  import { getItems } from "./store";

  const items = getItems();

  const rndItems = [
    "a random item",
    "another random item",
    "yet another random item",
  ];

  function addItem() {
    $items = $items.concat(rndItems[$items.length % 3]);
  }
</script>

<div>
  <Button on:click={addItem}>add to this context only!</Button>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
