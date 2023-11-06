import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardImage, { CardImageProps } from '.';
import { Status } from '..';

describe('<CardImage />', () => {
  let props: CardImageProps = {
    src: '#',
    status: Status.Active,
    imageCount: 10,
  };
  it('should render', () => {
    render(<CardImage {...props} />);
    expect(screen.getByLabelText('Lounge image')).toBeInTheDocument();
  });
  it('should show lounge image count', () => {
    render(<CardImage {...props} />);
    expect(screen.getByText(String(props.imageCount))).toBeInTheDocument();
  });
  it('should hide image count when it is provided', () => {
    render(<CardImage {...props} imageCount={undefined} />);
    expect(screen.queryByLabelText('Lounge image count')).toBe(null);
  });
});
