import throttle from "@/utils/throttle";

interface Parameters {
  sampling: number;
}

export function logMousemove(
  node: HTMLElement,
  params: Parameters = { sampling: 0 }
) {
  function handleEvent(event: MouseEvent): void {
    node.innerHTML = `${event.clientX}, ${event.clientY}`;
  }

  let throttledHandleEvent: (event: MouseEvent) => void;
  let p = document.createElement("p");

  node.appendChild(p);

  function makeListener(sampling: number) {
    throttledHandleEvent = throttle(sampling, handleEvent);
    node.addEventListener("mousemove", throttledHandleEvent);
    p.innerHTML = `throttling at ${sampling}ms`;
  }
  function unsetListener() {
    node.removeEventListener("mousemove", throttledHandleEvent);
  }

  makeListener(params.sampling);

  return {
    update(params: Parameters) {
      unsetListener();
      makeListener(params.sampling);
    },

    destroy() {
      unsetListener();
    },
  };
}
