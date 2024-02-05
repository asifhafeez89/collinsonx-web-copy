export function toTitleCase(string: string | undefined | null): string {
  return string?.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) || '';
}
