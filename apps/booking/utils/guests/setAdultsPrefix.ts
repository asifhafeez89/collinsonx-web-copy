function setAdultsPrefix(adults: number): string {
  if (adults === 1) return `${adults} adult`;

  return `${adults} adults`;
}

export default setAdultsPrefix;
