<script lang="ts">
  import { onMount } from "svelte";
  export let active = false;
  export let disabled = false;

  let button: HTMLButtonElement;
  let visible: boolean = false;
  let m = { x: 0, y: 0 };

  onMount(() => {
    button.addEventListener("mousemove", handleMousemove);
  });

  function handleMousemove(event: MouseEvent) {
    const box = button.getBoundingClientRect();
    m.x = event.clientX - box.left;
    m.y = event.clientY - box.top;
  }

  function handleMouseout() {
    visible = false;
  }

  function handleMouseenter() {
    visible = true;
  }

  $: style = `--top: ${m.x - 25}px; --left: ${m.y - 25}px; --scale:${
    visible ? "1" : "0"
  };`;
</script>

<div class="wrapper" {style}>
  <button
    class="button"
    class:active
    on:click
    on:mouseenter={handleMouseenter}
    on:mouseleave={handleMouseout}
    {disabled}
    bind:this={button}><slot /></button
  >
</div>

<style lang="scss">
  .wrapper {
    display: inline-block;
    position: relative;
    z-index: 3;
    overflow: hidden;
  }
  .wrapper::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    box-shadow: 0px 0px 10px #fff;
    border-radius: 50%;
    opacity: 0.6;
    background-color: #fff;
    transform: translate(var(--top), var(--left)) scale(var(--scale));
    transition: transform 0.1s ease-out;
  }
  .button {
    overflow: hidden;
    padding: 10px;
    font-size: 20px;
    border: none;
    border-bottom: 3px solid transparent;
    background: #00000000;
    backdrop-filter: blur(25px);
    cursor: pointer;

    &:hover {
      border-bottom-color: #ffffff44;
    }
    &.active {
      border-bottom-color: #ffffff44;
    }
  }
</style>
