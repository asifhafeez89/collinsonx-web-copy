import { ApolloError } from '@collinsonx/utils/apollo';

export type Variant = 'pending' | 'confirmed' | 'declined';

export const colorMap: Record<Variant, string> = {
  pending: '#FFF3BF',
  confirmed: '#E9FAC8',
  declined: '#FFE3E3',
};

const whiteListedMessages = [`invalid input syntax for type uuid: "undefined"`];

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
