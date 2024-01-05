import Notification from './Notification';
import { BookingStatus } from '@collinsonx/utils';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<Notification />', () => {
  const content = 'foobar';
  it('should render', () => {
    const component = render(
      <Notification type={BookingStatus.Pending}>{content}</Notification>
    );

    expect(component.getByText(content)).toBeInTheDocument();
  });
});
