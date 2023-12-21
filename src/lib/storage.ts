import { writable, type Subscriber } from "svelte/store";

function saveToStorage<T extends unknown>(key: string): Subscriber<T> {
  return (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function withStorage<T = unknown>(data: T, key: string) {
  const stored = localStorage.getItem(key);
  const json = stored ? JSON.parse(stored) : null;
  const initial = json || data;
  const store = writable<T>(initial);
  store.subscribe(saveToStorage(key));
  return store;
}



export default withStorage;