export type LoungeImage = {
  altText: string;
  width: number;
  contentType: string;
  url: string;
  height: number;
};

export type LoungeFacilities =
  | 'DISABLE'
  | 'TV'
  | 'INTERNT'
  | 'NOSMOKE'
  | 'REFRESH'
  | 'AIRCON'
  | 'ALCOHOL'
  | 'NEWSMAG'
  | 'FLTINFO'
  | 'DMC'
  | 'FAX'
  | 'WIFI';

export type LoungeData = {
  experienceCategory: string;
  type: string;
  id: string;
  name: string;
  images: LoungeImage[];
  location: string;
  directions: string;
  openingHours: string;
  // facilities: LoungeFacilities[];
  facilities: string[];
  additionalInformation: string;
  loungeOperator: string;
  conditions: string;
  objectID: string;
};
