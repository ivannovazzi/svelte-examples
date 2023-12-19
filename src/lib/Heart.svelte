<script lang="ts">
  import { onMount } from "svelte";
  import { curveBasis, line } from "d3-shape";

  let heartRate: number = 0;
  let paths: [number, number][] = [[0,  100]];

  onMount(async () => {
    chainLoadData();
    chainTicker();
  });

  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function chainLoadData() {
    loadData()
      .then((data) => (heartRate = data))
      .then(() => delay(200))
      .then(chainLoadData);
  }

  async function chainTicker() {
    delay(100)
      .then(() => addPoint(50))
      .then(() => delay(400))
      .then(chainTicker);
  }

  async function loadData(): Promise<number> {
    const res = await fetch(
      "https://advent.sveltesociety.dev/data/2023/day-four.json"
    );
    const json = await res.json();
    return json.heartRate;
  }

  function addPoint(value: number) {
    paths = [...paths, [paths.length * 10, value]];
  }
  // draw a path based on the heart rate changing over time
  $: if (heartRate > 0) addPoint(heartRate);
  
  let curve = line().curve(curveBasis);
  $: d = curve(paths);
  

  
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
  .canvas {
    stroke: #fff;
    stroke-width: 2;
    fill: none;
  }
</style>

<div>
  {heartRate} bpm - {paths.length}
  <svg viewBox="0 0 300 100">
		<g class="canvas">
      <path d={d} style=""/>
    </g>
  </svg>
</div>
