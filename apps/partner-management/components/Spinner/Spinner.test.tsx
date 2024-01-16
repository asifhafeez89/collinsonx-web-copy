import Spinner from '.';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Spinner />', () => {
  it('should render', () => {
    const component = render(<Spinner />);
    expect(component.getByTestId('spinner')).toBeInTheDocument();
  });
});
