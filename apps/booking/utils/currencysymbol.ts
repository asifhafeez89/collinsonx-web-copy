export const currencyMap: Record<string, string> = {
  GBP: String.fromCharCode(163),
};

export const getCurrencySymbol = (currency: string) =>
  currencyMap[currency] || currency;
