import FormContainer from './FormContainer';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<FormContainer />', () => {
  it('should render', () => {
    const component = render(<FormContainer />);

    expect(component).toMatchSnapshot();
  });
});
