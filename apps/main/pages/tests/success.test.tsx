import * as React from 'react';
import renderer from 'react-test-renderer';
import Success from '../success';

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

describe('<Success />', () => {
  it('renders outline variant', () => {
    const tree = renderer.create(<Success />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
