import * as React from 'react';
import renderer from 'react-test-renderer';
import Card from '.';

const weekdays: string = 'Monday, Tuesday';
const price = {
  currency: 'USD',
  reservationCost: 17.5,
  lifestyleXReservationCharge: 20.5,
};

describe('Card component', () => {
  it('renders Container', () => {
    const tree = renderer
      .create(
        <Card
          handleClick={() => console.log()}
          title="My lounge"
          subtitle="Athens International Airport"
          price={price}
          openingHours={weekdays}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
