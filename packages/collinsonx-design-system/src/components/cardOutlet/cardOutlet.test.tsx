import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardOutlet, { CardOutletProps, Status } from '.';
import { Button } from '@mantine/core';

describe('<CardOutlet />', () => {
  let props: CardOutletProps = {
    legacyCode: 'LHR31',
    status: Status.Active,
    title: 'Club Aspire Lounge',
    name: 'London Heathrow',
    terminal: 'Terminal 5',
    lastEdit: '5 days ago',
    imageCount: 13,
    productCategories: [],
    rating: {
      stars: 5,
      ratingCount: 99,
    },
    imageUrl: '#',
    workflowStage: {
      type: 'draft',
      label: 'Draft',
    },
  };
  it('should render', () => {
    render(<CardOutlet {...props} />);
    expect(screen.getByLabelText(props.title)).toBeInTheDocument();
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
