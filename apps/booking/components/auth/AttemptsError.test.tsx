import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';

import AttemptsError from './AttempsError';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const push = jest.fn();

describe('<AttemptsError />', () => {
  it('renders', () => {
    const { getByRole, getByTestId } = render(<AttemptsError />);

    expect(getByRole('button')).toHaveTextContent('RE-ENTER EMAIL');
    expect(getByTestId('link-call-support')).toHaveTextContent('Call support');
    expect(getByTestId('attempts-header')).toHaveTextContent(
      'Sorry, too many wrong attempts'
    );
    expect(getByTestId('attempts-body')).toHaveTextContent(
      '5 incorrect attempts were made to enter the verification code. Please try again in an hour'
    );
  });

  describe('push', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (useRouter as jest.Mock).mockImplementation(() => ({
        push,
      }));
    });

    it('redirects to login on button click', () => {
      const component = render(<AttemptsError />);
      fireEvent.click(component.getByRole('button'));

      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenNthCalledWith(1, { pathname: '/auth/login' });
    });

    it('triggers mailto action on hyperlink click', () => {
      const component = render(<AttemptsError />);

      fireEvent.click(component.getByTestId('link-call-support'));

      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenNthCalledWith(
        1,
        'mailto:support@collinsongroup.com'
      );
    });
  });
});
