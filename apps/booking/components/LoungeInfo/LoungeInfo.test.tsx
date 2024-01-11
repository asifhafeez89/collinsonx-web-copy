import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';
import { LoungeInfo } from '.';
import { Experience } from '@collinsonx/utils';

const mockTranslation = {
  lounge: {
    perPerson: 'per person',
  },
};
jest.mock('hooks/useLocale', () => jest.fn(() => mockTranslation));

const mockLounge: Experience = {
  id: '123',
  loungeName: 'Mock Lounge Name',
  location: {
    airportCode: 'ABC',
    airportName: 'Mock Airport Name',
    terminal: 'Mock Terminal',
  },
  pricing: {
    currency: 'GBP',
    reservationOnlyFee: 50,
  },
  hasActiveLounges: true,
  bookings: [],
  invitations: [],
  partners: [],
  images: [
    {
      altText: 'Mock Lounge Name, Mock Terminal',
      contentType: 'image/jpeg',
      height: 375,
      id: '7ca7d2ab6734a76961a7d98e9f7833a8',
      lastModified: new Date('2018-09-19T00:00:00'),
      url: 'https://cdn03.collinson.cn/lounge-media/image/LHR14-12737.jpg',
      width: 500,
    },
  ],
};

describe('<LoungeInfo />', () => {
  it('renders', () => {
    const { getByText, getByAltText } = render(
      <LoungeInfo lounge={mockLounge} loading={false} />
    );

    expect(getByAltText('lounge image')).toHaveAttribute(
      'src',
      'https://cdn03.collinson.cn/lounge-media/image/LHR14-12737.jpg'
    );
    expect(getByText('Mock Lounge Name')).toBeInTheDocument();
    expect(getByText('Mock Airport Name, Mock Terminal')).toBeInTheDocument();
    expect(getByText('£50.00')).toBeInTheDocument();
  });

  it('does not render if there is no lounge', () => {
    const { queryByText } = render(<LoungeInfo loading={false} />);
    expect(queryByText('Mock Lounge Name')).not.toBeInTheDocument();
  });
});
