import * as React from 'react';
import renderer from 'react-test-renderer';
import Card from '.';

describe('Card component', () => {
    it('renders Conatiner', () => {
        const tree = renderer.create(<Card
        handleClick={() => console.log()}
        title= 'My lounge'
        pictureUrl= ''
        subtitle='Athens International Airport' />).toJSON();
        expect(tree).toMatchSnapshot();
    });

});