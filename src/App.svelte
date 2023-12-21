<script lang="ts">
  import { onMount } from "svelte";
  import { Link, Route, useLocation, useNavigate } from "svelte-navigator";
  import Button from "./components/Button.svelte";

  import Animation from "./views/Animation.svelte";
  import Follower from "./views/Follower.svelte";
  import Collection from "./views/Collection.svelte";
  import Heart from "./views/Heart.svelte";
  import ParentChild from "./views/ParentChild/ParentChild.svelte";
  import Saga from "./views/Saga/Saga.svelte";
  import Pixels from "./views/Pixels.svelte";
  import Actions from "./views/Actions.svelte";
  import DevStatus from "./components/DevStatus.svelte";

  const tabs = [
    { path: "actions", name: "Actions", component: Actions },
    { path: "animation", name: "Animation", component: Animation },
    { path: "data-access", name: "Data Access", component: Collection },
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
  const navigate = useNavigate();

  onMount(() => {
    if (!active?.length) {
      navigate(tabs[0].path);
    }
  });
</script>

<div class="page">
  <DevStatus />

  <nav class="menu">
    {#each tabs as { path, name }, i}
      <Link to={path}
        ><Button active={path === active} on:mouseenter={console.log}>{name}</Button></Link
      >
    {/each}
  </nav>
  <main>
    {#each tabs as { path, component }}
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
    background: #000000;
    position: relative;
    z-index: 10;
  }
  
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>
