import * as React from 'react';
import renderer from 'react-test-renderer';
import CheckEmail from '../pages/check-email';

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

describe('<CheckEmail />', () => {
  it('renders', () => {
    const tree = renderer.create(<CheckEmail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});