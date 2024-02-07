import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';
import { Status } from '@collinsonx/utils';

import CardOutlet, { CardOutletProps } from '.';
import { Button } from '@mantine/core';

describe('<CardOutlet />', () => {
  let props: CardOutletProps = {
    legacyCode: 'LHR31',
    status: Status.Active,
    title: 'Club Aspire Lounge',
    locationName: 'London Heathrow',
    terminal: 'Terminal 5',
    lastEdit: '5 days ago',
    imageCount: 13,
    productCategories: [],
    rating: {
      stars: 5,
      ratingCount: 99,
    },
    imageUrl: '#',
  };
  it('should render', () => {
    render(<CardOutlet {...props} />);
    expect(screen.getByText(props.title as string)).toBeInTheDocument();
  });
  it('should render footer', () => {
    render(
      <CardOutlet {...props}>
        <Button>Foobar</Button>
      </CardOutlet>
    );
    expect(screen.getByText('Foobar')).toBeInTheDocument();
  });
});
