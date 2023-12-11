export enum Client {
  Mastercard = 'MASTERCARD',
  None = 'NONE',
  Mastercard_HSBC = 'MASTERCARD_HSBC',
}

export function getClients(): Array<Client> {
  return [Client.Mastercard, Client.None, Client.Mastercard_HSBC];
}

export default Client;
