import { render } from 'test-utils';
import Term from '.';

describe('<Term />', () => {
  it('should render', () => {
    const text = 'Foobar';
    const elem = render(<Term>{text}</Term>);
    expect(elem.getByText(text)).toBeInTheDocument();
  });
});
