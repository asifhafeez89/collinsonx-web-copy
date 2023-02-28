import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Cart, Chat, Home } from '../../assets/icons';
import { LogoExperienceX } from '../../assets/logo';
import { MantineProvider, MantineThemeOverride } from '../../core';
import Header from '.';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();

describe('<Header />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders header', async () => {
    const { container } = render(
      <>
        <MantineProvider
          theme={{
            colors: {
              headerNavBg: ['#FFF'],
              headerNavColor: ['#000'],
              brandColor: ['#034E98'],
              splashColor: ['#044F99'],
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Header
            onClickSignout={mockFn}
            logo={<LogoExperienceX />}
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
        </MantineProvider>
      </>
    );

    const inputs = container.querySelectorAll('.mantine-Burger-root');

    fireEvent.click(inputs[0]);

    await waitFor(() => {
      screen.debug();

      fireEvent.click(screen.getByText(/Signout/i));
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
