export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

export const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

export type Brand = 'PRIORITY_PASS' | 'LOUNGE_KEY' | 'CERGEA' | 'HSBC';

/**
 * field types are subject to change - placing string temporarily
 * https://lifestyle-x-wiki.atlassian.net/wiki/spaces/BAAS/pages/97419266/How+will+we+redirect+to+the+Bridge+App#Parameters-to-be-received-when-opening-the-Bridge-App-from-PP%2FLK
 */
export interface BridgePayload {
  consumerNumber: string;
  membershipNumber: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  brand_affiliation: Brand;
  lounge: string;
  client?: string;
  source_code: string;
}
