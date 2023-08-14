const resultsMock = {
  airports: [
    {
      id: 'LHR-2',
      label: 'London Heathrow - Terminal 2',
    },
    {
      id: 'LHR-3',
      label: 'London Heathrow - Terminal 3',
    },
    {
      id: 'LHR-5',
      label: 'London Heathrow - Terminal 5',
    },
  ],
  lounges: [
    {
      id: 'lounge1',
      label: 'No1 Lounge',
      airport: {
        id: 'LHR-3',
        label: 'London Heathrow - Terminal 3',
      },
    },
    {
      id: 'aspire3',
      label: 'Club Aspire Lounge',
      airport: {
        id: 'LHR-3',
        label: 'London Heathrow - Terminal 3',
      },
    },
    {
      id: 'aspire3',
      label: 'Club Aspire Lounge',
      airport: {
        id: 'LHR-5',
        label: 'London Heathrow - Terminal 5',
      },
    },
  ],
};

export default resultsMock;
