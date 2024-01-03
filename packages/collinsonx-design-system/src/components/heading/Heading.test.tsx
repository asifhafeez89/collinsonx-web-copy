import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import { Heading } from './Heading';

describe('<Heading />', () => {
  it('renders heading', () => {
    const tree = renderer
      .create(
        <Provider>
          <Heading as="h2" className="foo" padding={0} margin={0}>
            Heading Title
          </Heading>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
