import renderer from 'react-test-renderer';
import LoungeImageTitle from '.';

describe('<LoungeImageTitle />', () => {
  it('renders LoungeImageTitle', () => {
    const tree = renderer
      .create(
        <LoungeImageTitle
          price="80"
          location="Athens, Greece"
          image="image.png"
          title="LoungeX"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
