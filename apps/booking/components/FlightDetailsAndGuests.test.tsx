import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FlightDetailsAndGuests } from './FlightDetailsAndGuests';

const mockFlightDetails = {
  departureTime: '2023-11-30 18:00',
  flightNumber: 'EI3688',
  guestList: { adults: 1, infants: 0, children: 0 },
  lounge: {
    __typename: 'Experience',
    id: '86c23871-46df-5469-8a46-0aa7b7a25261',
    loungeName: 'Aspire Lounge',
    loungeCode: 'BHD1',
  },
  noEdit: undefined,
};

describe('<FlightDetailsAndGuests/>', () => {
  it('render', () => {
    const { getByText } = render(
      <FlightDetailsAndGuests
        departureTime={mockFlightDetails.departureTime}
        flightNumber={mockFlightDetails.flightNumber}
        guestList={mockFlightDetails.guestList}
      />
    );
    expect(getByText('Flight details')).toBeInTheDocument();
    expect(getByText("Who's coming?")).toBeInTheDocument();
    expect(getByText('Flight number')).toBeInTheDocument();
    expect(getByText(mockFlightDetails.flightNumber)).toBeInTheDocument();
  });
});
