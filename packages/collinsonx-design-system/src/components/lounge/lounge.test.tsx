import renderer from 'react-test-renderer';
import  Lounge  from '.';

describe('<Lounge />', () => {
    it('renders Lounge', () => {
        const tree = renderer
            .create(
                <Lounge
                    image="image.png"
                    airport="LA"
                    loungeName="Totally lounge"
                    openingTimes="10:00 - 12:00"
                    openDays="All day long"
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})