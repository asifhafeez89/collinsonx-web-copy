export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

export const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

export type AccountProvider = 'PP' | 'LK' | 'CERGEA';

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
export interface BridgePayload {
  membershipNumber: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountProvider: AccountProvider;
  lounge: LoungeSchema;
  membershipType?: string;
  sourceCode: string;
}
