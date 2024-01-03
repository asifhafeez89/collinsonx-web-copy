import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';

import CardField, { CardFieldProps } from './index';
import { Box } from '@mantine/core';

describe('<CardField />', () => {
  let props: CardFieldProps = {
    label: 'My field',
    children: <Box>mock</Box>,
  };
  it('should render', () => {
    render(<CardField {...props} />);
    expect(screen.getByText(props.label)).toBeInTheDocument();
  });
  it('should render children', () => {
    render(<CardField {...props} />);
    expect(screen.getByText('mock')).toBeInTheDocument();
  });
});
