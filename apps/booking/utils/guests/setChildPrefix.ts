function setChildPrefix(child: number, adults: number): string {
  let guestsPrefix = '';
  if (adults > 0) {
    guestsPrefix = ' and ';
  }

  if (child === 0) return '';

  const sufix = child === 1 ? 'child' : 'children';

  return `${guestsPrefix}${child} ${sufix}`;
}

export default setChildPrefix;
