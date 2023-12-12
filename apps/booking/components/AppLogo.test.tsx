import renderer from 'react-test-renderer';
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
    const tree = renderer
      .create(
        <AppLogo
          accountProvider={AccountProvider.PP}
          membershipType={Client.Mastercard}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders snapshot for HSBC', () => {
    const tree = renderer
      .create(
        <AppLogo
          accountProvider={AccountProvider.PP}
          membershipType={Client.Mastercard_HSBC}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders snapshot for None', () => {
    const tree = renderer
      .create(
        <AppLogo
          accountProvider={AccountProvider.PP}
          membershipType={Client.None}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
