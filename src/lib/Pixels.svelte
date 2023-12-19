<script lang="ts">
  import { onMount } from "svelte";
  let canvas: HTMLCanvasElement;
  let h: number;
  let w: number;
  let buffer32: Uint32Array;
  let style: string;
  let pixels: string[] = [];
  let pixelSize = 5;

  onMount(() => {
    const ctx = canvas.getContext("2d")!;
    canvas.width = 300;
    canvas.height = 300;
    const img = new Image();
    img.src = "src/assets/svelte.svg";
    img.onload = () => {
      w = img.width;
      h = img.height;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0);
      const idata = ctx.getImageData(0, 0, w, h);
      buffer32 = new Uint32Array(idata.data.buffer);
    };
  });

  $: if (buffer32) pixelate(pixelSize);
  
  function pixelate(size: number) {
    pixels = [];        
    for (let y = 0; y < h; y += size) {
      for (let x = 0; x < w; x += size) {
        const pos = y * w + x;
        const color = buffer32[pos];        
        pixels = [...pixels, `#${color.toString(16)}`];
      }
    }

    const gridColumns = Math.round(w / size);

    style = `
      grid-template-columns: repeat(${gridColumns}, ${Math.floor(size)}px);
    `;
  }
</script>

<div class="container">
  <div>
    <canvas bind:this={canvas} />
    <br />
    <input type="range" min="3" max="10" bind:value={pixelSize} />
  </div>
  <div class="grid" {style}>
    {#each pixels as pixel}
      <div
        class="grid-cell"
        style={`background: ${pixel}; width: ${pixelSize}px; height: ${pixelSize}px`}
      ></div>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  canvas {
    /* visibility: hidden; */
    border: 1px solid #000;
  }
  .grid {
    display: grid;
    grid-gap: 2px;
  }
  .grid-cell {
    background: #ffffff00;
  }
</style>
