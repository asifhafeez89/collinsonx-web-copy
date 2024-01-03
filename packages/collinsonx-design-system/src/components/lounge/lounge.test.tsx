import { Provider } from 'test-utils';
import renderer from 'react-test-renderer';
import Lounge from '.';

describe('<Lounge />', () => {
  it('renders Lounge', () => {
    const tree = renderer
      .create(
        <Provider>
          <Lounge
            image="image.png"
            airport="LA"
            loungeName="Totally lounge"
            openingTimes="10:00 - 12:00"
            openDays="All day long"
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
