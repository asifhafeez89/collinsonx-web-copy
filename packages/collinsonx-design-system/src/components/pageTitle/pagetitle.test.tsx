import renderer from 'react-test-renderer';
import  PageTitle  from '.';

describe('<PageTitle />', () => {
    it('renders PageTitle', () => {
        const tree = renderer
            .create(
                <PageTitle
                    title="test"
                    url="https://bbc.co.uk"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})