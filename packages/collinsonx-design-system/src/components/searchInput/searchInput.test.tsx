import renderer from 'react-test-renderer';
import SearchInput from '.';

const mockFn = jest.fn();

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
                    onClickClear={mockFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})