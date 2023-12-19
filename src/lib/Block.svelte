<script lang="ts">
  let m = { x: 0, y: 0 };
  let size = 50;

  let interval = 0;

  function start() {
    interval = setInterval(() => {
      size+=3;
    }, 100);
  }

  function stop() {
    clearInterval(interval);
    size = 50;
  }

  function handleMousemove(event: MouseEvent) {
    m.x = event.clientX;
    m.y = event.clientY;
  }

  function handleMouseDown(event: MouseEvent) {
    start();
  }
  function handleMouseUp(event: MouseEvent) {
    stop();
  }

  $: style =
    [
      `transform: translate(${m.x - size / 2}px, ${m.y - size / 2}px)`,
      `width: ${size}px`,
      `height: ${size}px`,
      `opacity: ${(50 / size).toFixed(2)}`
    ].join(";") + ";";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="container"
  on:mousemove={handleMousemove}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
>
  <div class="cursor" {style}></div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
  }
  .cursor {
    position: absolute;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    transition:
      transform 0.1s ease-out,
      width 0.2s ease-out,
      height 0.2s ease-out,
      opacity 0.2s ease-out;

  }
</style>
