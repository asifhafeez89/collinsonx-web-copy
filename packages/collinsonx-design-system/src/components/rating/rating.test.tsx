import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Rating from '.';

describe('<Rating />', () => {
  let props = {
    stars: 5,
    ratingCount: 99,
  };
  it('should render', () => {
    render(<Rating {...props} />);
    expect(screen.getByLabelText('rating')).toBeInTheDocument();
  });
  it('should show exact number of stars', () => {
    render(<Rating stars={3} ratingCount={9} />);
    expect(screen.getAllByLabelText('star').length).toBe(3);
  });
  it('should show total reviews', () => {
    render(<Rating stars={3} ratingCount={9} />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });
  it('should not render for <= 0 stars', () => {
    render(<Rating stars={0} ratingCount={9} />);
    expect(screen.queryByLabelText('rating')).not.toBeInTheDocument();
  });
  it('should not render for > 5 stars', () => {
    render(<Rating stars={6} ratingCount={9} />);
    expect(screen.queryByLabelText('rating')).not.toBeInTheDocument();
  });
});
