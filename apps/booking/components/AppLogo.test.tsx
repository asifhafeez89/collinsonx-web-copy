import { render } from '@collinsonx/design-system/test-utils';
import '@testing-library/jest-dom/extend-expect';
import AppLogo from './AppLogo';
import { AccountProvider, Client } from '@collinsonx/constants/enums';

jest.mock('@collinsonx/design-system/assets/logo', () => ({
  LogoHSBC: () => {
    const LogoHSBC = 'HSBC';
    return <div>HSBC</div>;
  },
  LogoLK: () => {
    const LogoLK = 'LK';
    return <div>LK</div>;
  },
  LogoPP: () => {
    const LogoPP = 'PP';
    return <div>PP</div>;
  },
}));

describe('<AppLogo />', () => {
  it('renders snapshot for PP', () => {
    const { getByText } = render(
      <AppLogo
        accountProvider={AccountProvider.PP}
        membershipType={Client.Mastercard}
      />
    );

    expect(getByText('PP')).toBeInTheDocument();
  });

  it('renders snapshot for LK', () => {
    const { getByText } = render(
      <AppLogo
        accountProvider={AccountProvider.LK}
        membershipType={Client.Mastercard}
      />
    );

    expect(getByText('LK')).toBeInTheDocument();
  });

  it('renders snapshot for HSBC', () => {
    const { getByText } = render(
      <AppLogo
        accountProvider={AccountProvider.LK}
        membershipType={Client.Mastercard_HSBC}
      />
    );

    expect(getByText('HSBC')).toBeInTheDocument();
  });
});
