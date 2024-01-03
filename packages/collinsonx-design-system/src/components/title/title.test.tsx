import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';

import Title from '.';

describe('<Title />', () => {
  it('should render with order', () => {
    render(<Title order={1}>Hello world</Title>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
  it('should render without order', () => {
    render(<Title>Hello world</Title>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
