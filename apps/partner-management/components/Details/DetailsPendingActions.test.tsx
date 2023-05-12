import DetailsPendingActions, {
  DetailsPendingActionsProps,
} from './DetailsPendingActions';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsPendingActions />', () => {
  let props: DetailsPendingActionsProps;
  let handleClickDecline: () => void;
  let handleClickConfirm: () => void;
  beforeEach(() => {
    handleClickDecline = jest.fn();
    handleClickConfirm = jest.fn();
    props = {
      onClickConfirm: handleClickConfirm,
      onClickDecline: handleClickDecline,
    };
  });
  it('should render', () => {
    const component = render(<DetailsPendingActions {...props} />);
    expect(component.getAllByRole('button').length).toBe(2);
  });
  it('should handle confirm button click', () => {
    const component = render(<DetailsPendingActions {...props} />);
    const btn = component.getByText('Confirm');
    fireEvent.click(btn);
    expect(handleClickConfirm).toHaveBeenCalledTimes(1);
  });
  it('should handle decline button click', () => {
    const component = render(<DetailsPendingActions {...props} />);
    const btn = component.getByText('Decline');
    fireEvent.click(btn);
    expect(handleClickDecline).toHaveBeenCalledTimes(1);
  });
});
