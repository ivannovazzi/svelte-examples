import { writable, type Writable } from "svelte/store";
import { getContext, setContext } from 'svelte'

const defaultItems = [
    "Read my books",
    "Eat some foods",
    "Bath the dogs",
    "Take out the garbage",
    "Water the flowers"
];

type Items = typeof defaultItems;

export function setItems() {
	let items = writable<Items>(defaultItems);
	setContext('items', items);
}

export function getItems() {
	return getContext<Writable<Items>>('items')
}
