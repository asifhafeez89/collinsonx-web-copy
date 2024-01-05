import BookingModal from '.';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@collinsonx/design-system/test-utils';

describe('<BookingModal />', () => {
  it('should render', () => {
    const component = render(
      <BookingModal onClickClose={() => {}} booking={null} />
    );

    expect(component.getByTestId('modal')).toBeInTheDocument();
  });
});
