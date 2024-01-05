import Error from './Error';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Error />', () => {
  const title = 'An error occurred';
  it('should not render without error', () => {
    const component = render(<Error title={title} />);

    expect(component.queryByText(title)).not.toBeInTheDocument();
  });
  it('should render with error', () => {
    let err = {
      name: 'error',
      message: 'there is some error',
      graphQLErrors: [],
      protocolErrors: [],
      clientErrors: [],
      networkError: null,
      extraInfo: '',
    };
    const component = render(<Error error={err} title={title} />);

    expect(component.queryByText(title)).toBeInTheDocument();
  });
});
