import renderer from 'react-test-renderer';
import  Status  from '.';

describe('<Status />', () => {
    it('renders Status', () => {
        const tree = renderer
            .create(
                <Status
                    status="PENDING"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})