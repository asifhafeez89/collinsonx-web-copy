const flightNumber_VALIDATION = /([0-9]{0,1}[a-zA-Z]{1,3})([0-9]*)/gi;

export function validateFlightNumber(
  flightNumber: string
): [boolean, string | undefined, string | undefined] {
  const match = [...flightNumber.matchAll(flightNumber_VALIDATION)];

  if (!match) {
    return [false, undefined, undefined];
  }

  const carrierLen = match[0]?.[1]?.length ?? 0;
  if (carrierLen < 1 || carrierLen > 3) {
    return [false, undefined, undefined];
  }

  const flightNumberNoLen = match[0]?.[2]?.length ?? 0;
  if (flightNumberNoLen < 1 || flightNumberNoLen > 5) {
    return [false, undefined, undefined];
  }

  return [true, match[0][1], match[0][2]];
}
