import DetailsButton, { DetailsButtonProps } from './DetailsButton';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsButton />', () => {
  let props: DetailsButtonProps;

  beforeEach(() => {
    props = {
      variant: 'success',
    };
  });
  it('should render', () => {
    const component = render(<DetailsButton {...props} />);
    expect(component.getByRole('button')).toBeInTheDocument();
  });
});
