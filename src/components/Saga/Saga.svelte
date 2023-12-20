<script lang="ts">
  import { start, stop, increment, todo, config } from "./saga";
  
</script>
<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;    
  }
</style>

<div>
  <button on:click={start} disabled={$config.active}>start</button>
  <button on:click={increment}>addTimeout</button>
  <button on:click={stop}>stop</button>
  <input type="range" min="100" max="1000" bind:value={$config.timeout} /> 
  <p>
    {JSON.stringify($todo?.id)}
  </p>
</div>
