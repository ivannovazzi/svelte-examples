export default function throttle(ms: number, fn: Function) {
  let last = 0;
  return function throttled(...args: any) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    return fn(...args);
  };
}
