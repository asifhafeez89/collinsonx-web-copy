import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Experience } from '@collinsonx/utils';
import useLocale from 'hooks/useLocale';
import { useMemo } from 'react';

import classes from './Price.module.css';

interface PriceProps {
  guests?: {
    adults: number;
    children: number;
    infants: number;
  };
  lounge?: Experience;
  currentPrice?: number;
  displaydifference?: boolean;
  confirmationDisplay?: boolean;
}

const Price = ({
  lounge,
  guests,
  currentPrice,
  displaydifference = false,
  confirmationDisplay = false,
}: PriceProps) => {
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

  const curentPriceWithFloating = currentPrice
    ? (currentPrice / 100).toFixed(2)
    : '0.00';

  const loungePriceWithNoCurrency = useMemo(() => {
    if (guests) {
      return lounge?.pricing?.currency && lounge.pricing.reservationOnlyFee
        ? Number.parseInt(
            getSumToPay(guests, lounge.pricing.reservationOnlyFee)
          )
        : 0;
    } else {
      return 0;
    }
  }, [lounge, guests]);

  const loungePrice = useMemo(() => {
    if (guests) {
      return lounge?.pricing?.currency && lounge.pricing.reservationOnlyFee
        ? getCurrencySymbol(lounge.pricing.currency) +
            ' ' +
            getSumToPay(guests, lounge.pricing.reservationOnlyFee)
        : '';
    }
  }, [lounge, guests]);

  const priceDifference =
    loungePriceWithNoCurrency - Number.parseInt(curentPriceWithFloating);

  const priceDiffwithSign =
    lounge?.pricing?.currency &&
    getCurrencySymbol(lounge.pricing.currency) +
      Math.abs(priceDifference).toFixed(2);

  return (
    <>
      {priceDifference < 0 && displaydifference && (
        <div className={classes.topPrice}>
          <div>
            <h3>
              {translations.booking.availableSlots.totalPrice.titleRefund}
            </h3>
            <p>{priceDiffwithSign}</p>
          </div>
        </div>
      )}

      {priceDifference > 0 && displaydifference && (
        <div className={classes.topPrice}>
          <div>
            <h3>{translations.booking.availableSlots.totalPrice.titleAmend}</h3>
            <p>{priceDiffwithSign}</p>
          </div>
        </div>
      )}

      {priceDifference === 0 && displaydifference && (
        <div className={classes.topPrice}>
          <div>
            <h3>{translations.booking.availableSlots.totalPrice.titleAmend}</h3>
            <p>{translations.booking.availableSlots.totalPrice.samePrice}</p>
          </div>
        </div>
      )}

      {(priceDifference !== 0 || confirmationDisplay) && (
        <div className={classes.whiteBg}>
          <h3>{translations.booking.availableSlots.totalPrice.title}</h3>
          <p>{loungePrice}</p>
        </div>
      )}
    </>
  );
};

export default Price;
