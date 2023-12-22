<script lang="ts">
  import { tweened } from "svelte/motion";
  import {
    fade,
    type TransitionConfig,
    type FadeParams,
  } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { type ToDo } from "@/types/common";

  const progress = tweened(0);
  progress.set(400);
  progress.update((x) => Math.min(100, x));
  $: style = `width: ${$progress.toFixed(1)}%`;

  let todos: ToDo[] = [
    {
      userId: 1,
      id: 1,
      title: "Do the dishes",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "Take out the trash",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: "Mow the lawn",
      completed: false,
    },
  ];

  function togglecompleted(todo: ToDo) {
    const { id } = todo;
    todos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  }

  $: uncompletedTodos = todos.filter((todo) => !todo.completed);

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
    {#each uncompletedTodos as todo (todo.id)}
      <div
        class="item"
        transition:mytransition={{ delay: 0, duration: 500, easing: cubicOut }}
      >
        <label>
          <input
            type="checkbox"
            checked={todo.completed}
            on:change={() => togglecompleted(todo)}
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
