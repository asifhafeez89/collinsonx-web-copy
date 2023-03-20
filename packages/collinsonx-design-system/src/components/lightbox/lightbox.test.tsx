import renderer from 'react-test-renderer';
import Lightbox from '.';
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
