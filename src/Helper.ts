export function swap<T>(first: T, second: T) {
  const tmp: T = first;
  first = second;
  second = tmp;
}
