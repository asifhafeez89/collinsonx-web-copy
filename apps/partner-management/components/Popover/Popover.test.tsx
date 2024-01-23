import React from 'react';
import { render, screen } from '@collinsonx/design-system/test-utils';
import Popover from './';
import '@testing-library/jest-dom';

describe('Popover Component', () => {
  it('renders correctly', () => {
    const testTitle = 'Test Title';
    const testBody = 'Test Body';

    render(<Popover title={testTitle} body={testBody} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testBody)).toBeInTheDocument();
  });
});
