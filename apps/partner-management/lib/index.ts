import { Booking, OutletStatus } from '@collinsonx/utils';
import { ApolloError } from '@collinsonx/utils/apollo';
import dayjs from 'dayjs';

export type Variant = 'pending' | 'confirmed' | 'declined' | 'qrcodewalkup';

export const colorMap: Record<Variant, string> = {
  pending: '#FFF3BF',
  confirmed: '#E9FAC8',
  declined: '#FFE3E3',
  qrcodewalkup: '#CABFF8',
};

const whiteListedMessages = [`invalid input syntax for type uuid: "undefined"`];

export const getOutletStatus = (status: OutletStatus) =>
  status === OutletStatus.Live ? 'ACTIVE' : 'INACTIVE';

export const isErrorValid = (error?: ApolloError) => {
  const everyErrorIsWhiteListed =
    error?.graphQLErrors.length &&
    error?.graphQLErrors.every((item) =>
      whiteListedMessages.includes(item.message)
    );

  const individualErrorIsWhiteListed =
    error && whiteListedMessages.includes(error?.message);

  if (error && !everyErrorIsWhiteListed && !individualErrorIsWhiteListed) {
    return true;
  } else {
    return false;
  }
};

export const expandBooking = (data?: { getBookings: Booking[] }) => {
  if (data) {
    return {
      ...data,
      getBookings: (data?.getBookings ?? []).map((row) => ({
        ...row,
        _id: row.reference || row.id,
        arrivalDate: dayjs(row.bookedFrom).format('YYYY-MM-DD'),
        arrivalTime: dayjs(row.bookedFrom).format('HH:mm'),
      })),
    };
  }
};
