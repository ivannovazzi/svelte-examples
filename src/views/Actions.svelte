<script>
  import { logMousemove } from "@/lib/actions";
  let sampling = 300;
</script>

<div>
  <div class="block" use:logMousemove={{ sampling }} />
  <label>
    throttle
    <input type="range" min="0" max="1000" bind:value={sampling} />
    {sampling}ms
  </label>
</div>

<style>
  .block {
    width: 200px;
    height: 200px;
    background: #f33;
    font-weight: bold;
  }
</style>
