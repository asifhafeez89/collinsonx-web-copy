import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Cart, Chat, Home } from '../../assets/icons';
import { LogoExperienceX } from '../../assets/logo';
import { MantineProvider, MantineThemeOverride } from '../../core';
import Header from '.';

const mockFn = jest.fn();

describe('<Header />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  type ThemeOptions = {
    fontFamily?: string;
  };

  it('renders header', () => {
    const tree = renderer.create(
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

    screen.debug();

    // expect(tree.toJSON()).toMatchSnapshot();
  });
});
