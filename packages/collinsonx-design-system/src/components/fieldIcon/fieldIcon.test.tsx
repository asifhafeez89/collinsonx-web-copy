import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';

import FieldIcon, { FieldIconProps } from '.';
import { Box } from '@mantine/core';

describe('<FieldIcon />', () => {
  let props: FieldIconProps = {
    text: 'foobar',
    textPosition: 'right',
    children: <Box aria-label="mock-icon" />,
  };
  it('should render text', () => {
    render(<FieldIcon {...props} />);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
  it('should render children', () => {
    render(<FieldIcon {...props} />);
    expect(screen.getByLabelText('mock-icon')).toBeInTheDocument();
  });
});
