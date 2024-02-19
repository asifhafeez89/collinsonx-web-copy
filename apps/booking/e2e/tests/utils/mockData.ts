import { AccountProvider } from '@collinsonx/constants/enums/AccountProviders';
import { Client } from '@collinsonx/constants/enums/Clients';
// import { AccountProvider, Client } from '@collinsonx/constants/enums';
import { JWTPayload } from 'jose';
import { v4 as uuidv4 } from 'uuid';
import { mailinatorAddress } from '../config';

export interface BridgePayload extends JWTPayload {
  membershipNumber: string;
  externalId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  accountProvider: AccountProvider;
  membershipType?: Client;
}

export function generateIdWithPrefix(): string {
  return 'e2e-' + (process.env.ENV || 'test').toLowerCase() + '-' + uuidv4();
}

export function generateEmailAddress(id: string): string {
  return `${id}@${mailinatorAddress}`;
}

export function generateNewUserWithoutNameAndEmail(): BridgePayload {
  const membershipType = Client.Mastercard_HSBC;
  const accountProvider = AccountProvider.PP;

  const user = {
    membershipNumber: generateIdWithPrefix(),
    externalId: generateIdWithPrefix(),
    membershipType,
    accountProvider,
  };
  return user;
}

export function generateNewUserWithoutName(email: string): BridgePayload {
  const user = generateNewUserWithoutNameAndEmail();
  user.email = email;
  return user;
}

export function generateFirstName() {
  return 'Alice';
}

export function generateLastName() {
  return 'Smith';
}

export function generateNewUser(email?: string): BridgePayload {
  const user = generateNewUserWithoutName(
    email || generateEmailAddress(generateIdWithPrefix())
  );
  user.firstName = generateFirstName();
  user.lastName = generateLastName();
  return user;
}

export function generateExistingUser(
  email: string,
  membershipNumber: string,
  externalId: string
): BridgePayload {
  const user = generateNewUser(email);
  user.membershipNumber = membershipNumber;
  user.externalId = externalId;
  return user;
}
