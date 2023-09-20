enum AccountProvider {
  PP = 'PRIORITY_PASS',
  LK = 'LOUNGE_KEY',
}

export function getAccountProviders(): Array<AccountProvider> {
  return [AccountProvider.PP, AccountProvider.LK];
}

export default AccountProvider;
