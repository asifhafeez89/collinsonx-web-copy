import Layout from './Layout';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<Layout />', () => {
    it('should render', () => {
  
      const component = render(
        <Layout    
        subHeader =  {<>header</>}
  hasPadding= {true}
  children = {<></>}
        />
      );
  
      expect(component).toMatchSnapshot();
    });
}
)