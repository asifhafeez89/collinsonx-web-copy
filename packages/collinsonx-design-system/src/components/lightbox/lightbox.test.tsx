import renderer from 'react-test-renderer';
import Lightbox from '.';

const mockFn = jest.fn();
describe('<Lightbox />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  xit('renders Lightbox', () => {
    const tree = renderer
      .create(
        <div>
          <Lightbox
            title="Hello world"
            open={true}
            ctaCancel="Go back"
            ctaForward="Cancel booking"
            onClose={() => {
              console.log('Do it');
            }}
            ctaForwardCall={() => {
              console.log('Do it');
            }}
          >
            <div>
              <h1>Cancel Booking</h1>
              <p>If you are no longer want this booking</p>
            </div>
          </Lightbox>
        </div>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
