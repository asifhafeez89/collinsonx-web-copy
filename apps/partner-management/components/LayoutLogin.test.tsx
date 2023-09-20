import LayoutLogin from './LayoutLogin';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<LayoutLogin />', () => {
  it('should render', () => {
    const component = render(
      <LayoutLogin subHeader={<>header</>} hasPadding={true}>
        <></>
      </LayoutLogin>
    );

    expect(component).toMatchSnapshot();
  });
});
