import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';
import { Status } from '@collinsonx/utils';

import Badge, { BadgeProps } from '.';

describe('<Badge />', () => {
  let props: BadgeProps = {
    type: Status.Active,
    size: 'small',
  };
  it('should render', () => {
    render(<Badge {...props} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
  it('should render children', () => {
    render(<Badge {...props}>foobar</Badge>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
