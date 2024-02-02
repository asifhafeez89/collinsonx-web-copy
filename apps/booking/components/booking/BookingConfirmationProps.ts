import { Booking } from 'context/bookingContext';
import { Experience } from '@collinsonx/utils';
import { AccountProvider, Client } from '@collinsonx/constants/enums';

export interface BookingConfirmedPdfProps {
  adults: Booking['adults'];
  arrival: string | undefined;
  children: Booking['children'];
  departureTime: string | Date | undefined | null;
  emailAddress: string | undefined;
  flightNumber: string;
  infants: Booking['infants'];
  locale: string;
  lounge: Experience;
  reference: string | undefined;
  platform: string | undefined;
  loungeCode: string | undefined;
  bookingId: string | null | undefined;
  linkAccountToken: string | undefined;
  accountProvider: AccountProvider | undefined;
  membershipType: Client | undefined;
  analyticsTag: string;
  currentPrice?: number | undefined;
}
