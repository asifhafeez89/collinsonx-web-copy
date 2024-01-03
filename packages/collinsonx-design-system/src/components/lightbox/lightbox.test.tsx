import Lightbox from '.';
import { render, screen, fireEvent, waitFor } from 'test-utils';

const mockFn = jest.fn();
const mockOpen = jest.fn();
describe('<Lightbox />', () => {
  it('gets clicked once ', async () => {
    render(
      <>
        <Lightbox
          ctaCancel="Go back"
          ctaForward="Cancel booking"
          ctaForwardCall={mockFn}
          title=""
          open={true}
          onClose={mockOpen}
        >
          <div>
            <h1>TEST</h1>
            <p>If you cancel you will no longer have this reservation.</p>
          </div>
        </Lightbox>
      </>
    );

    fireEvent.click(screen.getByText(/Cancel booking/i));

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(screen.getAllByText(/Go Back/i)[0]);

    await waitFor(() => {
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });
  });
});
