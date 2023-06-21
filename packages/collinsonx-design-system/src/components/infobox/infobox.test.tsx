import renderer from 'react-test-renderer';
import Infobox from '.';

describe('<InfoBox />', () => {
  it('renders Infobox', () => {
    const tree = renderer
      .create(
        <Infobox
          title="Your flight details"
          flight="Date"
          date="12/6/2023"
          handleEditClick={() => console.log()}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
