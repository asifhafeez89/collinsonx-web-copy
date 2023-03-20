import * as React from 'react';
import renderer from 'react-test-renderer';
import SignupUser from '../pages/signup-user';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('<SignupUser />', () => {
  it('renders outline variant', () => {
    const tree = renderer.create(<SignupUser />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
