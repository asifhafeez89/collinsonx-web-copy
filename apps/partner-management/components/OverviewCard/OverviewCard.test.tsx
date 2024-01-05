import OverviewCard from './index';
import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';

import { bookingPageConfig } from 'config/booking';

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

describe('<OverviewCard />', () => {
  const title = 'Test';
  const content = 'Foobar';

  it('should render', () => {
    const card = render(<OverviewCard title={title} variant="confirmed" />);

    expect(card.getByText('Test')).toBeInTheDocument();
  });
  it('should render children elements', () => {
    const card = render(
      <OverviewCard title={title} variant="confirmed">
        {content}
      </OverviewCard>
    );
    expect(card.getByText(content)).toBeInTheDocument();
  });
  it('should have corresponding background color for pending', () => {
    const variant = 'pending';
    const card = render(
      <OverviewCard title={title} variant={variant}>
        {content}
      </OverviewCard>
    );
    expect(card.getByText(title).parentNode).toHaveStyle(
      `background-color: ${hexToRgb(bookingPageConfig[variant].color)}`
    );
  });
  it('should have corresponding background color for confirmed', () => {
    const variant = 'confirmed';
    const card = render(
      <OverviewCard title={title} variant={variant}>
        {content}
      </OverviewCard>
    );
    expect(card.getByText(title).parentNode).toHaveStyle(
      `background-color: ${hexToRgb(bookingPageConfig[variant].color)}`
    );
  });
  it('should have corresponding background color for declined', () => {
    const variant = 'declined';
    const card = render(
      <OverviewCard title={title} variant={variant}>
        {content}
      </OverviewCard>
    );
    expect(card.getByText(title).parentNode).toHaveStyle(
      `background-color: ${hexToRgb(bookingPageConfig[variant].color)}`
    );
  });
});
