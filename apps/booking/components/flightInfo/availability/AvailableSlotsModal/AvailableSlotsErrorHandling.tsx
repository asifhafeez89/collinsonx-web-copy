import { FC } from 'react';

import type { AvailableSlotsErrorHandlingProps } from './props';

import {
  capacityParser,
  internalServerError,
  defaultError,
  capacityDefaultError,
} from './index';

import {
  errorMetadataIsCorrect,
  hasInternalServerError,
  hasDefaultError,
  hasLoungeCapacityDefaultError,
} from './helpers';

export function availableSlotsPopUpIsVisible({
  error,
  airportMismatch,
}: AvailableSlotsErrorHandlingProps): boolean {
  if (airportMismatch) return false;

  return (
    errorMetadataIsCorrect(error) ||
    hasInternalServerError(error) ||
    hasLoungeCapacityDefaultError(error) ||
    hasDefaultError(error)
  );
}

const AvailableSlotsErrorHandling: FC<AvailableSlotsErrorHandlingProps> = ({
  error,
  airportMismatch,
}) => {
  if (airportMismatch) return null;

  if (errorMetadataIsCorrect(error)) {
    return capacityParser(error);
  }

  if (hasLoungeCapacityDefaultError(error)) {
    return capacityDefaultError();
  }

  if (hasInternalServerError(error)) {
    return internalServerError();
  }

  if (hasDefaultError(error)) {
    return defaultError();
  }

  return null;
};

export default AvailableSlotsErrorHandling;
