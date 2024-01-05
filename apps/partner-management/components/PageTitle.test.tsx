import PageTitle from './PageTitle';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@collinsonx/design-system/test-utils';

import React from 'react';

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

    render(<PageTitle title={title} />);

    waitFor(() => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
