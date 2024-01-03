import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import PageTitle from '.';

describe('<PageTitle />', () => {
  it('renders PageTitle', () => {
    const tree = renderer
      .create(
        <Provider>
          <PageTitle title="test" onClickBack={() => {}} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
