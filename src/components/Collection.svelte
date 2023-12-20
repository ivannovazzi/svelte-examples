<script lang="ts">
  import { onMount } from "svelte";

  interface Elf {
    name: string;
    tally: number;
  }
  interface MyElf extends Elf {
    status: "good" | "bad";
  }
	let elves: MyElf[] = [];

	// the `$:` means 're-run whenever these values change'
	async function loadData(): Promise<MyElf[]> {
    const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-one.json");
    const json = await res.json() as Elf[];
    return json.slice(0, 20).map((item) => ({ ...item, status: "good" }));
  }

  onMount(async () => {
    elves = await loadData();
  });
</script>



<div style="height: 400px">
  <h1>Elves</h1>
  {#each elves as elf}
    <div>
      <input type="text" bind:value={elf.name}/> has <input type="number" bind:value={elf.tally}/> presents and is <select bind:value={elf.status}><option value="good">good</option><option value="bad">bad</option></select>
    </div>
  {/each}
</div>