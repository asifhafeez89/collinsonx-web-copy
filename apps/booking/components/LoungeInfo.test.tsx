import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { LoungeInfo } from './LoungeInfo';
import { Experience } from '@collinsonx/utils';

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
      <LoungeInfo
        guests={{ adults: 2, children: 1, infants: 0 }}
        lounge={mockLounge}
        loading={false}
      />
    );

    expect(getByAltText('lounge image')).toHaveAttribute(
      'src',
      'https://cdn03.collinson.cn/lounge-media/image/LHR14-12737.jpg'
    );
    expect(getByText('Mock Lounge Name')).toBeInTheDocument();
    expect(getByText('Mock Airport Name, Mock Terminal')).toBeInTheDocument();
    expect(getByText('£ 150.00')).toBeInTheDocument();
  });

  it('displays the correct sum to pay', () => {
    const { getByText } = render(
      <LoungeInfo
        guests={{ adults: 1, children: 0, infants: 0 }}
        lounge={mockLounge}
        loading={false}
      />
    );
    expect(getByText('£ 50.00')).toBeInTheDocument();
  });

  it('displays the correct sum to pay when infants are included', () => {
    const { getByText } = render(
      <LoungeInfo
        guests={{ adults: 1, children: 0, infants: 3 }}
        lounge={mockLounge}
        loading={false}
      />
    );
    expect(getByText('£ 50.00')).toBeInTheDocument();
  });
});
