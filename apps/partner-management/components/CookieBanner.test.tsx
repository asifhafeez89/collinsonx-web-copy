import CookieBanner from './CookieBanner';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<CookieBanner />', () => {
    it('should render', () => {
  
      const component = render(
        <CookieBanner />
      );
  
      expect(component).toMatchSnapshot();
    });
    it('button click',()=>{
      const component = render(<CookieBanner/>)
      const btn  = component.getByRole('button')
      fireEvent.click(btn)
    })
}
)