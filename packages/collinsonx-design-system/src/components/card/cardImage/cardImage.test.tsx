import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardImage, { CardImageProps } from '.';
import { Status } from '..';

describe('<CardImage />', () => {
  let props: CardImageProps = {
    src: '#',
    alt: 'Outlet image',
    status: Status.Active,
    imageCount: 10,
  };
  it('should render', () => {
    render(<CardImage {...props} />);
    expect(screen.getByLabelText('Outlet image')).toBeInTheDocument();
  });
  it('should show lounge image count', () => {
    render(<CardImage {...props} />);
    expect(screen.getByText(String(props.imageCount))).toBeInTheDocument();
  });
});
