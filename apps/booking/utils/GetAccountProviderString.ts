export const GetAccountProviderString = (accountProvider?: string) => {
  switch (accountProvider) {
    case 'LOUNGE_KEY':
      return 'Lounge Key';
    case 'PRIORITY_PASS':
      return 'Priority Pass';
    default:
      return 'Priority Pass';
  }
};
