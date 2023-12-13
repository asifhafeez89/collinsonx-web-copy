import { ApolloError } from '@collinsonx/utils/apollo';

import { BookingError } from '../../../../constants';

import fetchGrahpQLErrorObject from 'utils/fetchGrahpQLErrorObject';

import { AVAILABLE_SLOTS_ERRORS } from 'constants/graphql/errors';

import { HeaderStyle } from './enums';
import { Metadata } from './types';

import getError from 'utils/getError';

export function setHeaderTitle(
  headerStyle: HeaderStyle,
  translations: any
): string {
  switch (headerStyle) {
    case HeaderStyle.CAPACITY:
      return translations.capacity.title;
    case HeaderStyle.UNKNOWN:
      return translations.unavailable.title;
  }
}

export function errorMetadataIsCorrect(
  response: unknown | ApolloError
): boolean {
  const error = fetchGrahpQLErrorObject(response);

  if (!error) return false;

  const errorPropertiesAreInvalid =
    ('code' in error && 'metadata' in error) === false;

  if (errorPropertiesAreInvalid) return false;

  const metadata = error.metadata as Metadata;

  const metadataPropertiesAreInvalid =
    ('adultCount' in metadata &&
      'childrenCount' in metadata &&
      'infantCount' in metadata) === false;

  if (metadataPropertiesAreInvalid) return false;

  const { adultCount, childrenCount, infantCount } = metadata;
  const maxPropertiesAreInvalid =
    ('max' in adultCount && 'max' in childrenCount && 'max' in infantCount) ===
    false;

  if (maxPropertiesAreInvalid) return false;

  return true;
}

export function hasLoungeCapacityDefaultError(response: unknown | ApolloError) {
  const error = fetchGrahpQLErrorObject(response);
  if (!error) return false;

  if ('code' in error) {
    const code = error.code;

    return code === AVAILABLE_SLOTS_ERRORS.SNAPLOGIC.ENOUGH_CAPACITY.code;
  }

  return false;
}

export function hasDefaultError(response: unknown | ApolloError): boolean {
  const error = fetchGrahpQLErrorObject(response);
  if (!error) return false;

  return 'code' in error;
}

export function hasInternalServerError(response: unknown): boolean {
  const internalServerError = getError(
    response,
    BookingError.INTERNAL_SERVER_ERROR
  );

  return internalServerError ? true : false;
}
