export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

export const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

export type AccountProvider = 'PP' | 'LK' | 'CERGEA';

/**
 * https://lifestyle-x-wiki.atlassian.net/wiki/spaces/BAAS/pages/97419266/How+will+we+redirect+to+the+Bridge+App#Parameters-to-be-received-when-opening-the-Bridge-App-from-PP%2FLK
 */
export interface BridgePayload {
  membershipNumber: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountProvider: AccountProvider;
  lounge: string;
  membershipType?: string;
  sourceCode: string;
}
