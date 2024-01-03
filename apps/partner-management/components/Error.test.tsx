import Error from './Error';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Error />', () => {
  it('should render', () => {
    const component = render(<Error />);

    expect(component).toMatchSnapshot();
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
    const component = render(<Error error={err} />);

    expect(component).toMatchSnapshot();
  });
});
