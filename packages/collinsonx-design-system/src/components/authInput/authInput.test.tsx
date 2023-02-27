import renderer from 'react-test-renderer';
import AuthInput from '.';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();
describe('<AuthInput />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders AuthInput', () => {
        const tree = renderer
            .create(
                <AuthInput
                handleCodeChange={mockFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    xit('can type ', async () => {
        const { container } =  render(
            <>
                 <AuthInput
                    handleCodeChange={mockFn}
                />
            </>
        )

        const inputs = container.querySelectorAll('input')

        userEvent.type(inputs[0], '123456');

           await waitFor(() => {
               expect(mockFn).toHaveBeenCalledTimes(6);
              // expect(mockFn).toHaveBeenLastCalledWith('123456');
           })

    })
})