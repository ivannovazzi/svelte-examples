<script lang="ts">
  import { Link, Route, useLocation, useNavigate } from "svelte-navigator";

  import Follower from "./components/Follower.svelte";
  import Counter from "./components/Collection.svelte";
  import Heart from "./components/Heart.svelte";
  import ParentChild from "./components/ParentChild/ParentChild.svelte";
  import Saga from "./components/Saga/Saga.svelte";
  import Pixels from "./components/Pixels.svelte";

  const mode = import.meta.env.MODE;
  const isDevelopment = mode === "development";

  const tabs = [
    { path: "counter", name: "Counter", component: Counter },
    { path: "follower", name: "Follower", component: Follower },
    { path: "heart", name: "Heart", component: Heart },
    {
      path: "isolated-contexts",
      name: "Isolated Contexts",
      component: ParentChild,
    },
    { path: "saga", name: "Saga", component: Saga },
    { path: "pixels", name: "Pixels", component: Pixels },
  ];

  const location = useLocation();
  $: active = $location.pathname.slice(1);
  $: console.log(active.length);
  const n = useNavigate();
  if (!active?.length) {
    n(tabs[0].path);
  }
</script>

<div class="page">
  {#if isDevelopment}
    <div
      style="position: fixed; bottom: 0; left: 0; z-index: 1000; background: #00000099; color: #fff; padding: 10px;"
    >
      <p>Mode: {mode}</p>
      <p>Tab: {active}</p>
    </div>
  {/if}
  <nav class="menu">
    {#each tabs as { path, name }, i}
      <Link to={path}
        ><button class:active={path === active}>{name}</button></Link
      >
    {/each}
  </nav>
  <main>
    {#each tabs as { path, component }, i}
      <Route {path} {component} />
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
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>
