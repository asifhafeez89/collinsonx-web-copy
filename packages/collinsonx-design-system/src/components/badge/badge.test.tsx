import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Badge, { BadgeProps } from '.';

describe('<Badge />', () => {
  let props: BadgeProps = {
    type: 'active',
    size: 'small',
  };
  it('should render', () => {
    render(<Badge {...props} />);
    expect(screen.getByText('active')).toBeInTheDocument();
  });
  it('should render children', () => {
    render(<Badge {...props}>foobar</Badge>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
  it('should render type label if there are no children', () => {
    render(<Badge {...props} type="denied" />);
    expect(screen.getByText('denied')).toBeInTheDocument();
  });
});
