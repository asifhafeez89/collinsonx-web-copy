import { Details } from '@collinsonx/design-system';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Box, Flex } from '@collinsonx/design-system/core';
import { InfoPanel } from 'utils/PanelInfo';
import { GuestCount } from '../guest-count/GuestCount';
import Price from '../Price';
import { Experience } from '@collinsonx/utils';
import useLocale from 'hooks/useLocale';

import classes from './FlightDetailsAndGuests.module.css';
import { BOOKING_MODE } from '../../constants';
import usePayload from 'hooks/payload';

interface FlightDetailsAndGuestsProps {
  departureTime?: string;
  flightNumber: string;
  guestList: {
    adults: number;
    children: number;
    infants: number;
  };
  lounge?: Experience;
  noEdit?: boolean;
  currentPrice?: number;
  mode?: BOOKING_MODE;
  confirmationDisplay?: boolean;
  bookingId?: string;
}

export const FlightDetailsAndGuests = ({
  departureTime,
  flightNumber,
  guestList,
  lounge,
  noEdit,
  currentPrice,
  mode,
  confirmationDisplay = false,
  bookingId,
}: FlightDetailsAndGuestsProps) => {
  const translations = useLocale();

  const { locale, loungeCode, jwt } = usePayload();

  const handleEdit = () => {
    let url = '';
    if (noEdit) {
      return null;
    }
    if (mode === BOOKING_MODE.EDIT) {
      const amendBookingUrl = new URL(
        process.env.NEXT_PUBLIC_PRIORITY_PASS_ENDPOINT + '/amend-booking'
      );
      amendBookingUrl.searchParams.set('loungeCode', loungeCode!);
      amendBookingUrl.searchParams.set('bookingId', bookingId || '');
      amendBookingUrl.searchParams.set('linkAccountToken', jwt!);
      amendBookingUrl.searchParams.set('ln', locale);
      url = amendBookingUrl.toString();
    } else {
      url = '/';
    }
    return url;
  };
  return (
    <>
      <EditableTitle
        title={translations.booking.flightDetails.title}
        to={handleEdit()}
        as="h2"
      >
        {departureTime && (
          <Details
            infos={
              InfoPanel(
                departureTime,
                flightNumber,
                translations.booking.availableSlots.panelInfoHeader,
                translations.booking.flightDetails.localeValue
              ) as InfoGroup[]
            }
            direction="row"
          />
        )}
      </EditableTitle>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify={'space-between'}
        className={classes.guestsContainer}
      >
        <EditableTitle
          title={translations.booking.guestDetails.title}
          as="h2"
          showBorder={false}
        >
          <GuestCount guestList={guestList} />
        </EditableTitle>
        <Box className={classes.priceContainer}>
          <Price
            lounge={lounge}
            guests={guestList}
            currentPrice={currentPrice}
            displaydifference={mode === BOOKING_MODE.EDIT}
            confirmationDisplay={confirmationDisplay}
          ></Price>
        </Box>
      </Flex>
    </>
  );
};
