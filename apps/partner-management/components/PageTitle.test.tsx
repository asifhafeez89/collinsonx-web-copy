import PageTitle from './PageTitle';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  getNodeText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('<PageTitle />', () => {
    it('should render', () => {
  
      const component = render(
        <PageTitle
        title='title'
        />
      );
  
      expect(component).toMatchSnapshot();
    });
}
)