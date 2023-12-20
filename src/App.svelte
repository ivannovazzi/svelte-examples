<script lang="ts">
  import Follower from "./lib/Follower.svelte";
  import Counter from "./lib/Collection.svelte";
  import Heart from "./lib/Heart.svelte";
  import ParentChild from "./lib/ParentChild/ParentChild.svelte";
  import Saga from "./lib/Saga.svelte";
  import Pixels from "./lib/Pixels.svelte";
  
  const mode = import.meta.env.MODE;
  const test = import.meta.env.VITE_TEST;
  const testa = import.meta.env.TEST;

  let tab = 0;
  const tabs = [
    { name: "Counter", component: Counter },
    { name: "Follower", component: Follower },
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

<style lang="scss">
  .page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  nav {
    flex: 0;
    background: #00000099;
    backdrop-filter: blur(10px);
    position: relative;
    z-index: 10;
  }
  :global(button) {
    margin: 5px;
    padding: 10px;
    font-size: 20px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    cursor: pointer;
    
    &:hover {
      border-bottom-color: #ddd;
    }
  }
  button.active {
    border-bottom-color: #fff;
  }
  main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>
