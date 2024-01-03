import StatsTile, { StatsTileProps } from '.';

import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<StatsTile />', () => {
  let props: StatsTileProps = {
    label: 'Total',
    value: 75,
  };
  it('should render label', () => {
    const tile = render(<StatsTile {...props} />);
    expect(tile.getByText('Total')).toBeInTheDocument();
  });
  it('should render value', () => {
    const tile = render(<StatsTile {...props} />);
    expect(tile.getByText('75')).toBeInTheDocument();
  });
});
