import StatsTile, { StatsTileProps } from '.';

import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<StatsTile />', () => {
  const label = 'Total';
  const value = 75;

  let props: StatsTileProps = {
    label,
    value,
  };
  it('should render label', () => {
    const tile = render(<StatsTile {...props} />);
    expect(tile.getByText(label)).toBeInTheDocument();
  });
  it('should render value', () => {
    const tile = render(<StatsTile {...props} />);
    expect(tile.getByText(value)).toBeInTheDocument();
  });
});
