import DetailsConfirmedActions, {
  DetailsConfirmedActionsProps,
} from './DetailsConfirmedActions';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<DetailsConfirmedActions />', () => {
  let props: DetailsConfirmedActionsProps;
  let checkIn = true;
  let handleChangeCheckIn: DetailsConfirmedActionsProps['onChangeCheckIn'];
  let handleClickConfirm: DetailsConfirmedActionsProps['onClickConfirmCheckIn'];

  beforeEach(() => {
    handleChangeCheckIn = jest.fn();
    handleClickConfirm = jest.fn();
    props = {
      checkIn,
      onChangeCheckIn: handleChangeCheckIn,
      onClickConfirmCheckIn: handleClickConfirm,
    };
  });
  it('should render', () => {
    const component = render(<DetailsConfirmedActions {...props} />);
    expect(component.getByRole('checkbox')).toBeInTheDocument();
  });
  it('should be checked when checkIn is true', () => {
    const component = render(<DetailsConfirmedActions {...props} checkIn />);
    const checkbox = component.getByRole('checkbox', { checked: true });
    expect(checkbox).toBeInTheDocument();
  });
  it('should not be checked when checkIn is false', () => {
    const component = render(
      <DetailsConfirmedActions {...props} checkIn={false} />
    );
    const checkbox = component.queryAllByRole('checkbox', { checked: true });
    expect(checkbox.length).toBe(0);
  });
  it('should call onChangeCheckIn on checkbox click', () => {
    const component = render(
      <DetailsConfirmedActions {...props} checkIn={false} />
    );
    const checkbox = component.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChangeCheckIn).toHaveBeenCalledTimes(1);
  });
  it('should call onClickConfirmCheckIn on button click', () => {
    const component = render(<DetailsConfirmedActions {...props} checkIn />);
    const btn = component.getByRole('button');
    fireEvent.click(btn);
    expect(handleClickConfirm).toHaveBeenCalledTimes(1);
  });
  it('should disable button when checkIn is not checked', () => {
    const component = render(
      <DetailsConfirmedActions {...props} checkIn={false} />
    );
    const btn = component.getByRole('button');
    expect(btn).toBeDisabled();
  });
});
