import { render, screen, fireEvent, waitFor } from 'test-utils';
import { Cart, Chat, Home } from '../../assets/icons';
import { LogoCergea } from '../../assets/logo';
import Header from '.';

const mockFn = jest.fn();

describe('<Header />', () => {
  it('renders header', async () => {
    const { container } = render(
      <>
        <Header
          onClickSignout={mockFn}
          logo={<LogoCergea />}
          items={[
            {
              label: 'Home',
              link: '/lounge',
              icon: <Home color="#112132" />,
            },
            {
              label: 'My trips',
              link: '/lounge/bookings',
              icon: <Cart color="#112132" />,
            },
            {
              label: 'AI Travel companion',
              link: '/companion',
              icon: <Chat color="#112132" />,
            },
          ]}
        />
      </>
    );

    const inputs = container.querySelectorAll('.mantine-Burger-root');

    fireEvent.click(inputs[0]);

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Signout/i));
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
