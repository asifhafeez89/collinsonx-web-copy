import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardTitle from './';

describe('<CardTitle />', () => {
  let text = 'foobar';
  it('should render', () => {
    render(<CardTitle>{text}</CardTitle>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
