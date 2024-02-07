import { Status } from '@collinsonx/utils';
import { render, screen } from '../../test-utils';
import Card, { CardProps } from './';

describe('<CardList />', () => {
  let props: CardProps = {
    status: Status.Active,
  };
  it('should render', () => {
    render(<Card {...props}>foobar123</Card>);
    expect(screen.getByText('foobar123')).toBeInTheDocument();
  });
});
