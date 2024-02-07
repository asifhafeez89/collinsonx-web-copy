import { render, screen } from 'test-utils';
import '@testing-library/jest-dom';
import { Status } from '@collinsonx/utils';

import CardImage, { CardImageProps } from '.';

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
