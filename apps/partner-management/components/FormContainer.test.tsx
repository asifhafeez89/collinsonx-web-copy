import FormContainer from './FormContainer';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<FormContainer />', () => {
    it('should render', () => {
  
      const component = render(
        <FormContainer    
        />
      );
  
      expect(component).toMatchSnapshot();
    });
}
)