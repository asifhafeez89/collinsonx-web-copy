import { BookingStatus } from '@collinsonx/utils/generatedTypes/graphql';
import renderer from 'react-test-renderer';
import Status from '.';

const { Initialized } = BookingStatus;
describe('<Status />', () => {
  it('renders Status', () => {
    const tree = renderer.create(<Status status={Initialized} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
