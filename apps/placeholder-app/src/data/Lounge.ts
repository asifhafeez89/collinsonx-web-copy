export enum AirportCode {
  BHD = 'BHD',
  BHX = 'BHX',
  BRS = 'BRS',
  EDI = 'EDI',
  HUY = 'HUY',
  INV = 'INV',
  LPL = 'LPL',
  MAN = 'MAN',
  NCL = 'NCL',
  MAN3 = 'MAN3',
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
  FlightNumbers: string[];
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
    FlightNumbers: ['EI3688', 'EZY802', 'EI3656', 'BA1417'],
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
    FlightNumbers: ['MS782', 'EZY2065', 'EZY2269', 'LS1719'],
  },
  {
    LoungeCode: 'MAN3',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.MAN,
    AirportName: 'Manchester International',
    FlightNumbers: ['MS782', 'EZY2065', 'EZY2269', 'LS1719'],
  },
];

export const loungesProd: Array<LoungeSchema> = [
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
    FlightNumbers: ['EI3688', 'EZY802', 'EI3656', 'BA1417'],
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
    FlightNumbers: ['LS 1353', 'BA 8895', 'EJU 7844', 'EI 3647'],
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
    FlightNumbers: ['LS 1353', 'BA 8895', 'EJU 7844', 'EI 3647'],
  },
  {
    LoungeCode: 'EDI2',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge (Gate 16)',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.EDI,
    AirportName: 'Edinburgh International',
    FlightNumbers: ['BA8853', 'HU408', 'UA979', 'EZY602'],
  },
  {
    LoungeCode: 'EDI',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge (Gate 4)',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.EDI,
    AirportName: 'Edinburgh International',
    FlightNumbers: ['BA8853', 'HU408', 'UA979', 'EZY602'],
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
    FlightNumbers: ['KL1489', 'UNC49A', 'CHC48B', 'T3715'],
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
    FlightNumbers: ['GLMRE', 'EZY621', 'LM130', 'EZY847'],
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
    FlightNumbers: ['EI 3192', 'EZY 3368', 'FR 444', 'FR 1934'],
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
    FlightNumbers: ['MS782', 'EZY2065', 'EZY2269', 'LS1719'],
  },
  {
    LoungeCode: 'MAN3',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Aspire Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.MAN,
    AirportName: 'Manchester International',
    FlightNumbers: ['MS782', 'EZY2065', 'EZY2269', 'LS1719'],
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
    FlightNumbers: ['TOM589', 'LM505', 'EZY239', 'LS598'],
  },
  {
    LoungeCode: 'LAD1',
    Partner: {
      IntegrationId: '001',
      UID: 'Swissport to Provide',
    },
    ServiceCentre: 'London',
    LoungeName: 'Test Lounge',
    PPBOOperatorName: 'Swissport GB Limited',
    AirportCode: AirportCode.MAN,
    AirportName: 'Manchester International',
    FlightNumbers: ['MS782', 'EZY2065', 'EZY2269', 'LS1719'],
  },
];
