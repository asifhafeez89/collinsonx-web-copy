import CookieBanner from './';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@collinsonx/design-system/test-utils';

describe('<CookieBanner />', () => {
  it('should render', () => {
    const component = render(<CookieBanner />);
    const btn = component.getByRole('button');

    expect(btn).toBeInTheDocument();
  });
  it('should close banner when button has been clicked', () => {
    const component = render(<CookieBanner />);
    const btn = component.getByRole('button');
    fireEvent.click(btn);
    expect(btn).not.toBeInTheDocument();
  });
});
