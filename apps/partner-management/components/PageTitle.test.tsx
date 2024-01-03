import PageTitle from './PageTitle';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<PageTitle />', () => {
  it('should render', () => {
    const component = render(<PageTitle title="title" />);

    expect(component).toMatchSnapshot();
  });
});
