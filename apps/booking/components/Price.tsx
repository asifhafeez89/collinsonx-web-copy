import { Experience } from '@collinsonx/utils';
import useLocale from 'hooks/useLocale';
import { useMemo } from 'react';

interface PriceProps {
  guests?: {
    adults: number;
    children: number;
    infants: number;
  };
  lounge?: Experience;
  currentPrice?: number;
  title?: string;
}

const Price = ({ lounge, guests, currentPrice, title }: PriceProps) => {
  const currencyMap: Record<string, string> = {
    GBP: String.fromCharCode(163),
  };

  const translations = useLocale();

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

  return (
    <>
      {title && currentPrice !== loungePrice && <h3>{title}</h3>}
      {currentPrice === loungePrice
        ? translations.booking.availableSlots.totalPrice.samePrice
        : loungePrice}
    </>
  );
};

export default Price;
