function setInfantPrefix(
  infant: number,
  adults: number,
  child: number
): string {
  let guestsPrefix = '';
  if (adults > 0 || child > 0) {
    guestsPrefix = ' and ';
  }

  if (infant === 0) return '';

  if (infant === 1) {
    return `${guestsPrefix}${infant} infant`;
  }

  return `${guestsPrefix}${infant} infants`;
}

export default setInfantPrefix;
