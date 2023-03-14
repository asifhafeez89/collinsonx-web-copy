import * as React from 'react';
import renderer from 'react-test-renderer';
import LayoutLogin from './LayoutLogin';

describe('<LayoutLogin />', () => {
  it('renders outline variant', () => {
    const tree = renderer
      .create(
        <LayoutLogin>
          <div />
        </LayoutLogin>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
