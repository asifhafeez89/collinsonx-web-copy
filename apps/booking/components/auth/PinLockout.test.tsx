import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';

import PinLockout from './PinLockout';
import { BridgePayload } from 'types/booking';
import { AccountProvider, Client } from '@collinsonx/constants/enums';
import { PinLockoutError } from '@collinsonx/constants/constants';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const { tooManyAttempts, expiredJwt } = PinLockoutError;
const push = jest.fn();
const replace = jest.fn();

describe('<PinLockout />', () => {
  let mockPayload = {
    externalId: '',
    membershipNumber: '',
  } as BridgePayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders too many attempts error', () => {
    const { getByRole, getByTestId } = render(
      <PinLockout payload={mockPayload} errorMessage={tooManyAttempts} />
    );

    expect(getByRole('button')).toHaveTextContent('RE-ENTER EMAIL');
    expect(getByTestId('link-call-support')).toHaveTextContent(
      'Contact support'
    );
    expect(getByTestId('attempts-header')).toHaveTextContent(
      'Sorry, too many wrong attempts'
    );
    expect(getByTestId('attempts-body')).toHaveTextContent(
      '5 incorrect attempts were made to enter the verification code. Please try again in an hour'
    );
  });

  it('renders expired JWT error', () => {
    const { getByRole, getByTestId } = render(
      <PinLockout payload={mockPayload} errorMessage={expiredJwt} />
    );

    expect(getByRole('button')).toHaveTextContent('RESTART BOOKING');
    expect(getByTestId('link-call-support')).toHaveTextContent(
      'Contact support'
    );
    expect(getByTestId('attempts-header')).toHaveTextContent(
      'Verification code has expired'
    );
    expect(getByTestId('attempts-body')).toHaveTextContent(
      'Unfortunately the verification code has expired, so you have to restart your booking again'
    );
  });

  describe('push', () => {
    it('redirects to login on button click', () => {
      (useRouter as jest.Mock).mockImplementation(() => ({
        push,
      }));
      const component = render(
        <PinLockout payload={mockPayload} errorMessage="" />
      );
      fireEvent.click(component.getByRole('button'));

      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenNthCalledWith(1, { pathname: '/auth/login' });
    });

    describe('reroutes to correct contact page', () => {
      it.each`
        accountType          | membershipType | url
        ${'MASTERCARD_HSBC'} | ${true}        | ${'https://memberhelp.prioritypass.com/en/support/home'}
        ${'PP'}              | ${false}       | ${'https://memberhelp.prioritypass.com/en/support/home'}
        ${'LK'}              | ${false}       | ${'https://www.loungekey.com/en/contact-us'}
      `(
        'should redirect $accountType to correct URL',
        ({ accountType, membershipType, url }) => {
          (useRouter as jest.Mock).mockImplementation(() => ({
            replace,
          }));

          const defaultPayload = {
            ...mockPayload,
            membershipNumber: '',
            lounge: '',
            sourceCode: '',
            accountProvider:
              AccountProvider[accountType as keyof typeof AccountProvider],
          };

          mockPayload = membershipType
            ? {
                ...defaultPayload,
                membershipType: accountType,
              }
            : {
                ...defaultPayload,
                membershipType: Client.None,
              };

          const component = render(
            <PinLockout payload={mockPayload} errorMessage="" />
          );

          fireEvent.click(component.getByTestId('link-call-support'));

          expect(replace).toHaveBeenCalledTimes(1);
          expect(replace).toHaveBeenNthCalledWith(1, url);
        }
      );
    });
  });
});
