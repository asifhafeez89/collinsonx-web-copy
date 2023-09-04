enum Client {
  HSBC = 'HSBC',
  Collinson = 'Collinson',
  Mastercard = 'Mastercard',
}

export function getClients(): Array<Client> {
  return [Client.HSBC, Client.Collinson, Client.Mastercard];
}

export default Client;
