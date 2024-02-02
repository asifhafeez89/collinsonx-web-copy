import PageTitle from './PageTitle';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@collinsonx/design-system/test-utils';

import Session, {
  SessionContextType,
} from 'supertokens-auth-react/recipe/session';

import React from 'react';

jest.mock('supertokens-auth-react/recipe/session', () => ({
  useSessionContext: () => ({}),
}));
jest.mock('hooks/experience', () => ({
  __esModule: true,
  default: jest.fn(() => ({ userDetails: {}, client: 'collinson' })),
}));

describe('<PageTitle />', () => {
  beforeAll(() => {
    jest.doMock(
      'next/head',
      () =>
        function Head({ children }: { children: any }) {
          return <>{children}</>;
        }
    );
  });
  it('should render', async () => {
    const title = 'test title';
    jest
      .spyOn(Session, 'useSessionContext')
      .mockImplementation(() => ({} as SessionContextType));

    render(<PageTitle title={title} />);

    waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
