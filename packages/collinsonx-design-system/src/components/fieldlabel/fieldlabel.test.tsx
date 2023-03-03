import renderer from 'react-test-renderer';
import  FieldLabel  from '.';

const mockFn = jest.fn();

describe('<FieldLabel />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders fieldlabel', () => {
        const tree = renderer
            .create(
                <FieldLabel
                    title="Time of arrival"
                    value={"test"}
                    handleClick={mockFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})