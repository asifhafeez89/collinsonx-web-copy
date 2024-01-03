import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import Infobox from '.';

describe('<InfoBox />', () => {
  it('renders Infobox', () => {
    const tree = renderer
      .create(
        <Provider>
          <Infobox
            title="Your flight details"
            flight="Date"
            date="12/6/2023"
            handleEditClick={() => console.log()}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
