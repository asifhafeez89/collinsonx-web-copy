export function toTitleCase(string: string): string {
  return string.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}
