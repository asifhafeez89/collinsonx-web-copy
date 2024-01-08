import { Details } from '@collinsonx/design-system';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Box, Flex } from '@collinsonx/design-system/core';
import colors from 'ui/colour-constants';
import { InfoPanel } from 'utils/PanelInfo';
import { GuestCount } from '../guest-count/GuestCount';
import Price from '../Price';
import { Experience } from '@collinsonx/utils';
import useLocale from 'hooks/useLocale';

import classes from './FlightDetailsAndGuests.module.css';

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
}

export const FlightDetailsAndGuests = ({
  departureTime,
  flightNumber,
  guestList,
  lounge,
  noEdit,
}: FlightDetailsAndGuestsProps) => {
  const translations = useLocale();

  return (
    <>
      <EditableTitle
        title={translations.booking.flightDetails.title}
        to={noEdit ? null : '/'}
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
          <EditableTitle
            title={translations.booking.availableSlots.totalPrice.title}
            as="h2"
            showBorder={false}
          >
            <Price lounge={lounge} guests={guestList}></Price>
          </EditableTitle>
        </Box>
      </Flex>
    </>
  );
};
