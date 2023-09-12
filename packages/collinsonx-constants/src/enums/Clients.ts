enum Client {
  HSBC = 'HSBC',
  Collinson = 'COLLINSON',
  Mastercard = 'MASTERCARD',
}

export function getClients(): Array<Client> {
  return [Client.HSBC, Client.Collinson, Client.Mastercard];
}

export default Client;
