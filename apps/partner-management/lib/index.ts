export type Variant = 'pending' | 'confirmed' | 'declined';

export const colorMap: Record<Variant, string> = {
  pending: '#FFF3BF',
  confirmed: '#E9FAC8',
  declined: '#FFE3E3',
};

const whiteListedMessages = [`invalid input syntax for type uuid: "undefined"`];

export const isErrorValid = (error?: Error) => {
  if (error && !whiteListedMessages.includes(error?.message)) {
    return true;
  } else {
    return false;
  }
};
