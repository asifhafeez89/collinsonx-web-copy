import { Experience } from '@collinsonx/utils';
import { useMemo } from 'react';

interface PriceProps {
  guests?: {
    adults: number;
    children: number;
    infants: number;
  };
  lounge?: Experience;
}

const Price = ({ lounge, guests }: PriceProps) => {
  const currencyMap: Record<string, string> = {
    GBP: String.fromCharCode(163),
  };

  const getCurrencySymbol = (currency: string) =>
    currencyMap[currency] || currency;

  const getSumToPay = (
    guests: {
      adults: number;
      children: number;
      infants: number;
    },
    reservationOnlyFee: number
  ) => {
    const sum = reservationOnlyFee * (guests.adults + guests.children);
    return sum.toFixed(2);
  };

  const loungePrice = useMemo(() => {
    if (guests) {
      return lounge?.pricing?.currency && lounge.pricing.reservationOnlyFee
        ? getCurrencySymbol(lounge.pricing.currency) +
            ' ' +
            getSumToPay(guests, lounge.pricing.reservationOnlyFee)
        : '';
    }
  }, [lounge, guests]);

  return <>{loungePrice}</>;
};

export default Price;
