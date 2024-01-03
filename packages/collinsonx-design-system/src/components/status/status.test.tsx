import { BookingStatus } from '@collinsonx/utils/generatedTypes/graphql';
import renderer from 'react-test-renderer';
import { Provider } from 'test-utils';
import Status from '.';

const { Initialized } = BookingStatus;
describe('<Status />', () => {
  it('renders Status', () => {
    const tree = renderer
      .create(
        <Provider>
          <Status status={Initialized} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
