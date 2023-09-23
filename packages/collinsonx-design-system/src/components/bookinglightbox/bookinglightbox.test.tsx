import renderer from 'react-test-renderer';
import BookingLightbox from '.';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();
const mockOpen = jest.fn();
describe('<Lightbox />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

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
