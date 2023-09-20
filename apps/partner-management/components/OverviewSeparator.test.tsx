import OverviewSeparator from './OverviewSeparator';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<OverviewSeparator />', () => {
    it('should render', () => {
  
      const component = render(
        <OverviewSeparator
        />
      );
  
      expect(component).toMatchSnapshot();
    });
}
)