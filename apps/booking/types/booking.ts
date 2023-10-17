import { AccountProvider, Client } from '@collinsonx/constants/enums';
import { JWTPayload } from 'jose';

export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

export const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

enum AirportCode {
  BHD = 'BHD',
  BHX = 'BHX',
  BRS = 'BRS',
  EDI = 'EDI',
  HUY = 'HUY',
  INV = 'INV',
  LPL = 'LPL',
  MAN = 'MAN',
  NCL = 'NCL',
}

export type LoungeSchema = {
  LoungeCode: string;
  Partner: {
    IntegrationId: string;
    UID: string;
  };
  ServiceCentre: string;
  LoungeName: string;
  PPBOOperatorName: string;
  AirportCode: AirportCode;
  AirportName: string;
};

/**
 * https://lifestyle-x-wiki.atlassian.net/wiki/spaces/BAAS/pages/97419266/How+will+we+redirect+to+the+Bridge+App#Parameters-to-be-received-when-opening-the-Bridge-App-from-PP%2FLK
 */
export interface BridgePayload extends JWTPayload {
  membershipNumber: string;
  externalId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountProvider: AccountProvider;
  membershipType?: Client;
}

export type ViewStep = 'EDIT' | 'CONFIRM';

export interface BookingGuests {
  adults: number;
  children: number;
  infants: number;
}
