import BadgeCollinson from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<BadgeCollinson />', () => {
  it('should render', () => {
    const component = render(<BadgeCollinson />);

    expect(component.getByText('Collinson')).toBeInTheDocument();
  });
});
