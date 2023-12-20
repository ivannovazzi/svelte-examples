<script lang="ts">
  import { Route, Router } from "svelte-navigator";
	
  import App from "./App.svelte";
</script>
<Router>
  <Route path="/*">
    <App />
  </Route>
</Router>