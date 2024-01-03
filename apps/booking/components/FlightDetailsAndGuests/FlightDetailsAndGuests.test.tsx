import { render } from '@collinsonx/design-system/test-utils';
import { FlightDetailsAndGuests } from '.';

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
var mockTranslation = {
  booking: {
    flightDetails: {
      title: 'Flight Details',
    },
    availableSlots: {
      panelInfoHeader: {
        date: 'Date',
        flightTime: 'Time of flight',
        flightNumber: 'Flight number',
      },
      totalPrice: {
        title: 'Total price',
      },
    },
    guestDetails: {
      title: "Who's coming?",
      adultsInput: {
        label: 'Adults',
        description: 'Ages 12+',
      },
      childrenInput: {
        label: 'Children',
        description: 'Ages 2-11',
      },
      infantsInput: {
        label: 'Infants',
        description: 'Ages 0-2',
      },
    },
  },
};
jest.mock('hooks/useLocale', () => jest.fn(() => mockTranslation));

describe('<FlightDetailsAndGuests/>', () => {
  it('render', () => {
    const { getByText } = render(
      <FlightDetailsAndGuests
        departureTime={mockFlightDetails.departureTime}
        flightNumber={mockFlightDetails.flightNumber}
        guestList={mockFlightDetails.guestList}
      />
    );
    expect(getByText('Flight Details')).toBeInTheDocument();
    expect(getByText("Who's coming?")).toBeInTheDocument();
    expect(getByText('Flight number')).toBeInTheDocument();
    expect(getByText(mockFlightDetails.flightNumber)).toBeInTheDocument();
  });
});
