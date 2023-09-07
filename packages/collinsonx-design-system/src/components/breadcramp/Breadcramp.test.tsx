import * as React from 'react';
import renderer from 'react-test-renderer';
import Breadcramp from '.';

const mockFn = jest.fn();

describe('<Breadcramp />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders outline variant', () => {
    const tree = renderer
      .create(
        <Breadcramp
          lefttitle="London Gatwick"
          lefturl="https://bbc.co.uk"
          righttile="FAQ"
          righturl=""
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
