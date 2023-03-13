import * as React from 'react';
import renderer from 'react-test-renderer';
import SignupUser from '../pages/signup-user';

describe('<SignupUser />', () => {
  it('renders outline variant', () => {
    const tree = renderer.create(<SignupUser />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
