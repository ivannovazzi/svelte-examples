<script lang="ts">
  import { getItems} from "../store";
  
  const items = getItems();

  const rndItems = ["a random item", "another random item", "yet another random item"];
  
  function addItem() {
    $items = $items.concat(rndItems[$items.length % 3]);
  }
</script>

<div>
  <button on:click={addItem}>add to this context only!</button>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
