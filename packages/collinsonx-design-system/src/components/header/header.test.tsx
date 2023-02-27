import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart, Chat, Home } from '../../assets/icons';
import { LogoExperienceX } from '../../assets/logo';
import  Header  from '.';

const mockFn = jest.fn();

describe('<Header />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders header', () => {
        const tree = renderer
            .create(
                <>
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
                </>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})