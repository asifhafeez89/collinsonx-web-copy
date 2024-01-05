import React from 'react';
import { render } from '@collinsonx/design-system/test-utils';
import Status from '.';
jest.mock('@collinsonx/design-system/assets/icons', () => {
  return {
    __esModule: true,
    Pending: () => [],
    Confirmed: () => [],
    Declined: () => [],
  };
});
const item = 'item';
describe('<Status /> ', () => {
  it('should render warning type', () => {
    const component = render(<Status type="warning">{item}</Status>);
    expect(component.getByText(item)).toBeInTheDocument();
  });
  it('should render success type', () => {
    const component = render(<Status type="success">{item}</Status>);
    expect(component.getByText(item)).toBeInTheDocument();
  });
  it('should render danger type', () => {
    const component = render(<Status type="danger">{item}</Status>);
    expect(component.getByText(item)).toBeInTheDocument();
  });
});
