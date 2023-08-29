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
      .create(<Breadcramp title="London Gatwick" url="https://bbc.co.uk" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
