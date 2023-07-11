import LoadExperiences from './index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@collinsonx/utils/apollo', () => {
  return jest.fn(() => ({
    useQuery: () => {
      return [];
    },
  }));
});

describe('<LoadExperiences />', () => {
  it('should render', () => {
    const experience = {
      id: 'test',
      loungeName: 'Heathrow',
      bookings: [],
      invitations: [],
      partners: [],
    };

    const card = render(
      <LoadExperiences
        selectedExperience={experience}
        onExperienceSelected={() => console.log()}
      />
    );

    expect(card.getByText('Test')).toBeInTheDocument();
  });

  // it('should render children elements', () => {
  //   const card = render(
  //     <OverviewCard title="Test" variant="confirmed">
  //       Foobar
  //     </OverviewCard>
  //   );
  //   expect(card.getByText('Foobar')).toBeInTheDocument();
  // });

  // it('should have corresponding background color for pending', () => {
  //   const variant = 'pending';
  //   const card = render(
  //     <OverviewCard title="Test" variant={variant}>
  //       Foobar
  //     </OverviewCard>
  //   );
  //   expect(card.getByText('Test').parentNode).toHaveStyle(
  //     `background-color: ${bookingPageConfig[variant].color}`
  //   );
  // });

  // it('should have corresponding background color for confirmed', () => {
  //   const variant = 'confirmed';
  //   const card = render(
  //     <OverviewCard title="Test" variant={variant}>
  //       Foobar
  //     </OverviewCard>
  //   );
  //   expect(card.getByText('Test').parentNode).toHaveStyle(
  //     `background-color: ${bookingPageConfig[variant].color}`
  //   );
  // });

  // it('should have corresponding background color for declined', () => {
  //   const variant = 'declined';
  //   const card = render(
  //     <OverviewCard title="Test" variant={variant}>
  //       Foobar
  //     </OverviewCard>
  //   );
  //   expect(card.getByText('Test').parentNode).toHaveStyle(
  //     `background-color: ${bookingPageConfig[variant].color}`
  //   );
  // });
});
