import { render } from 'test-utils';
import Description from '.';

describe('<Description />', () => {
  it('should render', () => {
    const text = 'Foobar';
    const elem = render(<Description>{text}</Description>);
    expect(elem.getByText(text)).toBeInTheDocument();
  });
});
