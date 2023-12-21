import sleep from "@/utils/sleep";
import throttle from "@/utils/throttle";

interface Parameters {
  sampling: number;
}

export function logMousemove(node: HTMLElement, params: Parameters = { sampling: 0 }) {
  function handleEvent(event: MouseEvent) {
    node.innerHTML = `${event.clientX}, ${event.clientY}`;
  }

  let throttledHandleEvent: () => void;

  function setListener() {
    node.addEventListener("mousemove", throttledHandleEvent);
    const p = document.createElement("p");
    p.innerHTML = `throttling at ${params.sampling}ms`;
    node.appendChild(p);
  }
  function makeListener(s: number) {
    throttledHandleEvent = throttle(s, handleEvent);
  }
  function unsetListener() {
    node.removeEventListener("mousemove", throttledHandleEvent);   
  }

  makeListener(params.sampling);
  setListener();
  
  
  return {
    update(params: Parameters) {
      // the value of `bar` has changed
      node.innerHTML = `${params.sampling}`;
      unsetListener();
      makeListener(params.sampling)
      setListener();
    },

    destroy() {
      unsetListener();
    }
  };
}
