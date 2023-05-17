import * as React from 'react';
import renderer from 'react-test-renderer';
import Card from '.';

const weekdays: string[] = ['Monday', 'Tuesday'];

describe('Card component', () => {
  it('renders Container', () => {
    const tree = renderer
      .create(
        <Card
          handleClick={() => console.log()}
          title="My lounge"
          subtitle="Athens International Airport"
          price="17:50"
          openingHours={weekdays}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
