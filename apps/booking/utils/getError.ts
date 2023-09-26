import { isMapIterator } from 'util/types';
import { BookingError } from '../constants';

export default function getError(response: any, errorCode: BookingError) {
  if (response && response.errors) {
    return response.errors.find(
      (item: any) => item.extensions.code === errorCode
    );
  }
}
