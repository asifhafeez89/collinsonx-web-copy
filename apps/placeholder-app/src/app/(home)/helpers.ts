function randomIntValue(prefix: string = ''): string {
  const value = Math.floor(Math.random() * 10000).toString();

  return `${prefix}${value}`;
}

export { randomIntValue };
