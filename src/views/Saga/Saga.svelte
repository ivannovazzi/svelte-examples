<script lang="ts">
  import Button from "@/components/Button.svelte";
  import { start, stop, increment, decrement, todo, config } from "./saga";
</script>

<div class="container">
  <div class="controls">
    <Button on:click={start} disabled={$config.active}>start</Button>
    <Button on:click={increment}>add 100ms timeout</Button>
    <Button on:click={decrement}>remove 100ms timeout</Button>
    <Button on:click={stop}>stop</Button>
  </div>
  <div class="controls">
    <label>
      timeout:
      <input type="range" min="100" max="1000" bind:value={$config.timeout} />
    </label>
  </div>

  <pre>
    <code>
      {JSON.stringify($todo, null, 2)}

    </code>
  </pre>
</div>

<style>
  .container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }
  .controls {
    border: 1px solid #000;
  }
</style>
