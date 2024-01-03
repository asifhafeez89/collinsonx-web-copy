import Notification from './Notification';
import { BookingStatus } from '@collinsonx/utils';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Notification />', () => {
  it('should render', () => {
    const component = render(
      <Notification type={BookingStatus.Pending}>a</Notification>
    );

    expect(component).toMatchSnapshot();
  });
});
