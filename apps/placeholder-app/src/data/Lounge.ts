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

export const lounges: Array<LoungeSchema> = [
  {
    LoungeCode: 'BHD1',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.BHD,
    AirportName: 'Belfast George Best City',
  },
  {
    LoungeCode: 'BIRM',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.BHX,
    AirportName: 'Birmingham',
  },
  {
    LoungeCode: 'BHX4',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge (South)',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.BHX,
    AirportName: 'Birmingham',
  },
  {
    LoungeCode: 'BRS',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.BRS,
    AirportName: 'Bristol International',
  },
  {
    LoungeCode: 'EDI2',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge (Gate 4)',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.EDI,
    AirportName: 'Edinburgh International',
  },
  {
    LoungeCode: 'HUY',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.EDI,
    AirportName: 'Humberside Intl',
  },
  {
    LoungeCode: 'INV',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.INV,
    AirportName: 'Inverness Dalcross',
  },
  {
    LoungeCode: 'LPL1',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.LPL,
    AirportName: 'Liverpool John Lennon',
  },
  {
    LoungeCode: 'MAN6',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.MAN,
    AirportName: 'Manchester International',
  },
  {
    LoungeCode: 'NCL',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.NCL,
    AirportName: 'Newcastle International',
  },
];
