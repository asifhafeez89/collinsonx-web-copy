import * as React from 'react';
import renderer from 'react-test-renderer';
import Checkemail from '../pages/check-email';

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

describe('<Checkemail />', () => {
  xit('renders outline variant', () => {
    const tree = renderer.create(<Checkemail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
