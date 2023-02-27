import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  InputLabel  from '.';

const mockFn = jest.fn();

describe('<InputLabel />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });


    it('renders textinput', () => {
        const tree = renderer
            .create(
                <InputLabel
                    placeholder="Your name"
                    label="Full name"
                    withAsterisk
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('gets clicked once ', async () => {
        render(
            <>
                <InputLabel
                    placeholder="Your name"
                    label="Full name"
                    withAsterisk
                    onChange={mockFn}
                />
            </>
        )


       const inputnode =  screen.getByPlaceholderText('Your name');

       userEvent.type(inputnode, 'Hello');

       await waitFor(() => {
           expect(mockFn).toHaveBeenCalledTimes(5);
       })

    })
})