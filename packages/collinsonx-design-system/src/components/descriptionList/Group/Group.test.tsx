import { render } from 'test-utils';
import Group from '.';

describe('<Group />', () => {
  it('should render', () => {
    const text = 'Foobar';
    const elem = render(<Group>{text}</Group>);
    expect(elem.getByText(text)).toBeInTheDocument();
  });
});
