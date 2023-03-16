import renderer from 'react-test-renderer';
import Lightbox from '.';

const mockFn = jest.fn();
describe('<Lightbox />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders Lightbox', () => {
    const tree = renderer
      .create(
        <Lightbox title="Hello world" open={true}>
          <div>
            <h1>Cancel Booking</h1>
            <p>If you are no longer want this booking</p>
          </div>
        </Lightbox>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
