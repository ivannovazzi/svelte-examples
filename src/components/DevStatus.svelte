<script>
  const mode = import.meta.env.MODE;
  const isDevelopment = mode === "development";
</script>

{#if isDevelopment}
    <div
      style="position: fixed; bottom: 0; left: 0; z-index: 1000; background: #00000099; color: #fff; padding: 10px;"
    >
      <span>Mode: {mode}</span>
    </div>
  {/if}