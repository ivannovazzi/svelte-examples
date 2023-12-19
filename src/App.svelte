<script lang="ts">
  import Block from "./lib/Block.svelte";
  import Counter from "./lib/Collection.svelte";
  import Heart from "./lib/Heart.svelte";
  import ParentChild from "./lib/ParentChild/ParentChild.svelte";
  import Saga from "./lib/Saga.svelte";
  import Pixels from "./lib/Pixels.svelte";

  let tab = 0;
  const tabs = [
    { name: "Counter", component: Counter },
    { name: "Block", component: Block },
    { name: "Heart", component: Heart },
    { name: "Isolated Store + Context", component: ParentChild },
    { name: "Saga", component: Saga },
    { name: "Pixels", component: Pixels },
  ];
</script>

<div class="page">
  <nav class="menu">
    {#each tabs as { name, component }, i}
      <button on:click={() => (tab = i)} class:active={i === tab}>{name}</button>
    {/each}
  </nav>
  <main>
    {#each tabs as { name, component }, i}
      {#if i === tab}
        <svelte:component this={component} />
      {/if}
    {/each}
  </main>
</div>

<style>
  .page {
    width: 100%;
    height: 100vh;
  }
  nav button {
    margin: 5px;
    padding: 10px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
  }
  button.active {
    background: #000;

  }
  main{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
