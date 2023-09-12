import BookingModal from './BookingModal';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<BookingModal />', () => {
    it('should render', () => {
  
      const component = render(
        <BookingModal
        onClickClose={() => console.log() } 
        booking={null}        
        />
      );
  
      expect(component).toMatchSnapshot();
    });
}
)