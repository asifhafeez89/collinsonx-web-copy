import * as React from 'react';
import renderer from 'react-test-renderer';
import Home from '../pages/index';
import { MockedProvider } from '@collinsonx/utils/apollo';
import { SuperTokensWrapper } from '@collinsonx/utils/supertokens';

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

describe('<Home />', () => {
  it('renders outline variant', () => {
    const tree = renderer
      .create(
        <SuperTokensWrapper>
          <MockedProvider mocks={[]} addTypename={false}>
            <Home />
          </MockedProvider>
        </SuperTokensWrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
