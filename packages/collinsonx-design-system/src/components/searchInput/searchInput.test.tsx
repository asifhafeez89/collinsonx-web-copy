import renderer from 'react-test-renderer';
import SearchInput from '.';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockFn = jest.fn();
const mockClFn = jest.fn();
describe('<SearchInput />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders SearchInput', () => {
        const tree = renderer
            .create(
                <SearchInput
                    placeholder="Search for airport or lounge"
                    value={"Hello"}
                    onChange={mockFn}
                    onClickClear={mockClFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('can type ', async () => {
        render(
            <>
                <SearchInput
                        placeholder="Search for airport or lounge"
                        value={"Hello"}
                        onChange={mockFn}
                        onClickClear={mockClFn}
                />
            </>
        )


       const inputnode =  screen.getByPlaceholderText('Search for airport or lounge');

       userEvent.type(inputnode, 'Los Angeles');

       await waitFor(() => {
           expect(mockFn).toHaveBeenCalledTimes(11);
       })

    })
})