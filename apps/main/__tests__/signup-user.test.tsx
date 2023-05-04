import * as React from 'react';
import renderer from 'react-test-renderer';
import SignupUser from '../pages/signup-user';
import { MockedProvider } from '@collinsonx/utils/testing';

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
    const tree = renderer
      .create(
        <MockedProvider mocks={[]} addTypename={false}>
          <SignupUser />
        </MockedProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
