import { HeaderStyle, FooterStyle } from './enums';

import { ApolloError } from '@collinsonx/utils/apollo';

interface CapacityProps {
  adults?: number;
  child?: number;
  infants?: number;
}

interface ComponentProps {
  headerStyle: HeaderStyle;
  footerStyle: FooterStyle;
  Message: JSX.Element;
}

interface AvailableSlotsErrorHandlingProps {
  error: ApolloError | unknown;
  airportMismatch: boolean;
}

export type { CapacityProps, ComponentProps, AvailableSlotsErrorHandlingProps };
