import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  DatePicker  from '.';

const mockFn = jest.fn();
const DATE_FORMAT = 'MM/DD/YYYY';

describe('<Datepicker />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders datepicker', () => {
        const tree = renderer
            .create(
                <DatePicker
                    placeholder="Pick date"
                    label="Date"
                    withAsterisk
                    clearable={false}
                    inputFormat={DATE_FORMAT}
                    labelFormat={DATE_FORMAT}
                    value={undefined}
                    styles={{
                    label: {
                        color: 'black',
                        fontWeight: 600,
                    },
                    }}
                    onChange={mockFn}
              />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    xit('gets clicked once ', async () => {
        render(
            <>
                <DatePicker
                    placeholder="Pick date"
                    label="Date"
                    withAsterisk
                    clearable={false}
                    inputFormat={DATE_FORMAT}
                    labelFormat={DATE_FORMAT}
                    value={new Date()}
                    styles={{
                    label: {
                        color: 'black',
                        fontWeight: 600,
                    },
                    }}
                    onChange={mockFn}
              />
            </>
        )


       const button = screen.getAllByPlaceholderText("Pick date")
                    
        userEvent.click(button[0]);

        screen.debug();

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
        })

    })
})