import React from 'react';
import { render } from '@collinsonx/design-system/test-utils';
import Status from './Status';
jest.mock('@collinsonx/design-system/assets/icons', () => {
  return {
    __esModule: true,
    Pending: () => [],
    Confirmed: () => [],
    Declined: () => [],
  };
});
test('renders Type component with warning type', () => {
  const component = render(<Status type={'warning'}>warning</Status>);
  expect(component).toMatchSnapshot();
});
test('renders Type component with success type', () => {
  const component = render(<Status type={'success'}>success</Status>);
  expect(component).toMatchSnapshot();
});
test('renders Type component with danger type', () => {
  const component = render(<Status type={'danger'}>danger</Status>);
  expect(component).toMatchSnapshot();
});
