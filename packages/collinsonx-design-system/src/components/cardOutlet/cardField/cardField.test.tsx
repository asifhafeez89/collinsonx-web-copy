import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardField, { CardFieldProps } from './index';
import { Box } from '@mantine/core';

describe('<CardField />', () => {
  let props: CardFieldProps = {
    label: 'My field',
    children: <Box aria-label="mock" />,
  };
  it('should render', () => {
    render(<CardField {...props} />);
    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
  });
  it('should render children', () => {
    render(<CardField {...props} />);
    expect(screen.getByLabelText('mock')).toBeInTheDocument();
  });
});
