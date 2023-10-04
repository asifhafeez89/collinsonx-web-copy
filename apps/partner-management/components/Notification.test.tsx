import Notification from './Notification';
import { BookingStatus } from '@collinsonx/utils';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Box, Flex, Text } from '@collinsonx/design-system/core';

describe('<Notification />', () => {
  it('should render', () => {
    const component = render(
      <Notification type={BookingStatus.Pending}>a</Notification>
    );

    expect(component).toMatchSnapshot();
  });
});
