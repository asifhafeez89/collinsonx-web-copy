import renderer from 'react-test-renderer';
import PageTitle from '.';

describe('<PageTitle />', () => {
  it('renders PageTitle', () => {
    const tree = renderer
      .create(<PageTitle title="test" onClickBack={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
