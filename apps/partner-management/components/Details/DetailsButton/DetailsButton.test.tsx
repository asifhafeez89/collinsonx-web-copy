import DetailsButton, { DetailsButtonProps } from './';
import { render } from '@collinsonx/design-system/test-utils';
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
