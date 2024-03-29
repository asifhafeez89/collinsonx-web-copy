import BookingLightbox from '.';
import { render, screen, fireEvent, waitFor } from 'test-utils';

const mockFn = jest.fn();
const mockOpen = jest.fn();
describe('<Lightbox />', () => {
  it('gets clicked once ', async () => {
    render(
      <>
        <BookingLightbox
          ctaCancel="Go back"
          ctaForward="Airports mismatch"
          ctaForwardCall={mockFn}
          open={true}
          onClose={mockOpen}
        >
          <div>
            <p>
              Please note, that the lounge you are booking is not in the airport
              your flight is scheduled.{' '}
            </p>

            <p> Lounge airport is Gatwick. </p>

            <p>
              {' '}
              Flight departure airport is Heathrow. Do you still want to book
              this lounge even it is not in the airport of departure?
            </p>
          </div>
        </BookingLightbox>
      </>
    );

    fireEvent.click(screen.getAllByText(/Go Back/i)[0]);

    await waitFor(() => {
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });
  });
});
