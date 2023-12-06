import SysAuth from './AuthWrapper';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

jest.mock('supertokens-auth-react/recipe/session', () => {
  return {
    __esModule: true,
    useSessionContext: () => ({
      loading: false,
      doesSessionExist: false,
      invalidClaims: [],
      accessTokenPayload: {
        'st-ev': {
          v: false,
          t: 1693901902449,
        },
        userType: 'SUPER_USER',
        experiences: 3,
      },
      userId: 'abc',
    }),
  };
});

describe('<SysAuth />', () => {
  it('should render', () => {
    const component = render(<SysAuth>sysauth</SysAuth>);

    expect(component).toMatchSnapshot();
  });

  it('should render false', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/signup' },
    });
    const component = render(<SysAuth>sysauth</SysAuth>);

    expect(component).toMatchSnapshot();
  });
});
