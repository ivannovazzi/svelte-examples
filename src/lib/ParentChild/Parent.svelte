<script lang="ts">
  import { getItems, setItems} from "../store";

  setItems();  

  const items = getItems();
  
</script>

<style>
  div {
    border: 3px solid #000;
    padding: 10px;
  }
</style>

<div >
  <h3>data in this context has {$items.length} items</h3>
  <slot />
</div>
