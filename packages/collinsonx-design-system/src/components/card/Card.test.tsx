import * as React from 'react';
import renderer from 'react-test-renderer';
import Card from '.';

describe('Card component', () => {
  it('renders Container', () => {
    const tree = renderer
      .create(
        <Card
          handleClick={() => console.log()}
          title="My lounge"
          subtitle="Athens International Airport"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
