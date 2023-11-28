import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card, { CardProps } from './';
import { Status } from './';

describe('<CardList />', () => {
  let props: CardProps = {
    status: Status.Active,
  };
  it('should render', () => {
    render(<Card {...props}>foobar</Card>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
