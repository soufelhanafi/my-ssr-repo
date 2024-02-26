export function shuffleArrayElements<T>(list: T[]): T[] | null {
  if (!list) return null;
  if (!list.length) return [];

  return [...list]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
