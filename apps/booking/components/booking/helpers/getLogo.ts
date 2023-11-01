import { AccountProvider, Client } from '@collinsonx/constants/enums';
import { priorityPass, loungeKey, hsbc } from '../pdfLogos';

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC } = Client;

const logos: Record<AccountProvider | string, string> = {
  [PP]: priorityPass,
  [LK]: loungeKey,
  [Mastercard_HSBC]: hsbc,
};

interface AppLogoProps {
  accountProvider: AccountProvider | null | undefined;
  membershipType?: string | null | undefined;
}

export const getLogo = ({ accountProvider, membershipType }: AppLogoProps) => {
  const membershipLogo = membershipType && logos[membershipType];
  const providerLogo = accountProvider && logos[accountProvider];

  if (membershipLogo) return membershipLogo;
  else if (providerLogo) return providerLogo;
  else return logos[PP];
};
