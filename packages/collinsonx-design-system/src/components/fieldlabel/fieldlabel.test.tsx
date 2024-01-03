import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import FieldLabel from '.';

const mockFn = jest.fn();

describe('<FieldLabel />', () => {
  it('renders fieldlabel', () => {
    const tree = renderer
      .create(
        <Provider>
          <FieldLabel
            title="Time of arrival"
            value={'test'}
            handleClick={mockFn}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
