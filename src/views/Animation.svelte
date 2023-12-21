<script lang="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import {
    fade,
    type TransitionConfig,
    type FadeParams,
  } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const progress = tweened(0);
  progress.set(400);
  progress.update((x) => Math.min(100, x));
  $: style = `width: ${$progress.toFixed(1)}%`;

  let todos = [
    {
      id: 1,
      title: "Do the dishes",
      done: false,
    },
    {
      id: 2,
      title: "Take out the trash",
      done: false,
    },
    {
      id: 3,
      title: "Mow the lawn",
      done: false,
    },
  ];

  function toggleDone(todo) {
    console.log("dio");
    const { id } = todo;
    todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }

  $: undoneTodos = todos.filter((todo) => !todo.done);

  $: {
    console.log("rodos", todos);
    console.log("undoneTodos", undoneTodos);
  }
  const mytransition = (
    node: Element,
    { delay, duration, easing }: FadeParams
  ): TransitionConfig => {
    return {
      delay,
      duration,
      easing,
      css: (t) => {
        return `
          transform: scale(${1 + 1 - t});
          opacity: ${t};
        `;
      },
    };
  };
</script>

<div>
  <h1>Tweened</h1>
  <div class="container">
    <div class="progress" {style} />
  </div>

  <div class="items">
    {#each undoneTodos as todo (todo.id)}
      <div
        class="item"
        transition:mytransition={{ delay: 0, duration: 500, easing: cubicOut }}
      >
        <label>
          <input
            type="checkbox"
            checked={todo.done}
            on:change={() => toggleDone(todo)}
          />
          {todo.title}
        </label>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    border: 1px solid #fff;
    padding: 2px;
    display: inline-block;
    width: 200px;
    height: 10px;
    .progress {
      height: 100%;
      background: #fff;
    }
  }

  .fader {
    height: 10px;
    width: 10px;
    background: #fff;
  }
</style>
