enum AccountProvider {
  PP = 'PP',
  LK = 'LK',
  Cergea = 'Cergea',
}

export function getAccountProviders(): Array<AccountProvider> {
  return [AccountProvider.PP, AccountProvider.LK, AccountProvider.Cergea];
}

export default AccountProvider;
