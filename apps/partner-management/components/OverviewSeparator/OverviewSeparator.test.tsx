import OverviewSeparator from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<OverviewSeparator />', () => {
  it('should render', () => {
    const component = render(<OverviewSeparator />);

    expect(component.getByTestId('OverviewSeparator')).toBeInTheDocument();
  });
});
