interface Parameters {
  delay: number;
}

export function logMouseenter(node: HTMLElement, params: Parameters = { delay: 0 }) {

  async function handleEvent(event: MouseEvent) {
    await sleep(params.delay);
    console.log(event.clientX, event.clientY);
  }

  node.addEventListener("mouseenter", handleEvent);
  
  return {
    update(params: Parameters) {
      // the value of `bar` has changed
    },

    destroy() {
      node.removeEventListener("mouseenter", handleEvent);
    }
  };
}
