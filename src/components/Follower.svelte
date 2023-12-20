<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
  });

  let m = { x: 0, y: 0 };
  let size = 50;
  let scale = 1;
  let interval = 0;

  function handleMousemove(event: MouseEvent) {
    m.x = event.clientX;
    m.y = event.clientY;
  }

  function handleMouseDown(event: MouseEvent) {
    interval = setInterval(() => {
      if (scale < 3) scale += 0.3;
    }, 100);
  }
  function handleMouseUp(event: MouseEvent) {
    clearInterval(interval);
    scale = 1;
  }

  $: style =
    [
      `transform: translate(${m.x - size / 2}px, ${
        m.y - size / 2
      }px) scale(${scale})`,
      `opacity: ${(50 / size).toFixed(2)}`,
    ].join(";") + ";";

  let h: number;
  let w: number;
</script>

<div class="cursor" {style}></div>
<div class="grid" bind:clientHeight={h} bind:clientWidth={w}>
  {#each (new Array(90).fill(0)) as item , i}
    <div class="grid-item"/>
  {/each}
</div>

<style lang="scss">
  .cursor {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    transition:
      transform 0.1s ease-out,
      width 0.2s ease-out,
      height 0.2s ease-out,
      opacity 0.2s ease-out;
  }
  .grid {
    flex: 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(30, 1fr);
    gap: 1px;
    &-item {
      backdrop-filter: blur(20px);
      background-color: #00000099;
    }    
  }
</style>
