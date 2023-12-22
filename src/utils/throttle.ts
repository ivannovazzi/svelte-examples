export default function throttle<T extends ((...args: any[]) => any)>(ms: number, fn: T):T {
  let last = 0;
  const returned = function () {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    return fn(...arguments);
  };
  return returned as T;
}
