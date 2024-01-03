import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import LoungeImageTitle from '.';

describe('<LoungeImageTitle />', () => {
  it('renders LoungeImageTitle', () => {
    const tree = renderer
      .create(
        <Provider>
          <LoungeImageTitle
            price="80"
            location="Athens, Greece"
            image="image.png"
            title="LoungeX"
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
