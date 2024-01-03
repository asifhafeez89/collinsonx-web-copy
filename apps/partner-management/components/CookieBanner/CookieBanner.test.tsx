import CookieBanner from './';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@collinsonx/design-system/test-utils';

describe('<CookieBanner />', () => {
  it('should render', () => {
    const component = render(<CookieBanner />);

    expect(component).toMatchSnapshot();
  });
  it('button click', () => {
    const component = render(<CookieBanner />);
    const btn = component.getByRole('button');
    fireEvent.click(btn);
  });
});
