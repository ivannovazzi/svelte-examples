import { readable, get } from "svelte/store";
import storage from "@/lib/storage";
import sleep from "@/utils/sleep";

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getToDo() {
  const id = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return (await res.json()) as ToDo;
}

const initialConfig = {
  timeout: 1000,
  active: false,
};

export const config = storage(initialConfig, "config");

export const todo = readable<ToDo | undefined>(undefined, (set) => {
  load();

  async function load() {
    await sleep(get(config).timeout);
    if (get(config).active) {
      set(await getToDo());
    }
    load();
  }
});

export const start = () => config.update((c) => ({ ...c, active: true }));
export const stop = () => config.update((c) => ({ ...c, active: false }));
export const increment = () =>
  config.update((c) => ({ ...c, timeout: c.timeout + 100 }));
export const decrement = () =>
  config.update((c) => ({ ...c, timeout: c.timeout - 100 }));
