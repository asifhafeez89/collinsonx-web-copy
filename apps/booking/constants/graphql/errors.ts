export const GraphQLErrorResponses = {
  BOOKING: {
    AVAILABLE_SLOTS: {
      RESPONSE_IS_EMPTY: {
        code: 'ERR_BOOKING_AVAILABLE_SLOTS_RESPONSE_IS_EMPTY',
      },
      SNAPLOGIC: {
        CATCH_ERROR: {
          code: 'ERR_BOOKING_AVAILABLE_SLOTS_SNAPLOGIC_CATCH_ERROR',
        },
        ENOUGH_CAPACITY: {
          code: 'ERR_BOOKING_AVAILABLE_SLOTS_NOT_ENOUGH_CAPACITY',
        },
        VALIDATION_ERROR: {
          code: 'ERR_BOOKING_AVAILABLE_SLOTS_SNAPLOGIC_VALIDATION_ERROR',
        },
      },
    },
    CANCEL: {
      BOOKING_NOT_FOUND: {
        code: 'ERR_BOOKING_CANCEL_BOOKING_NOT_FOUND',
      },
      MUTATION_RESOLVER: {
        CATCH_STATE: {
          code: 'ERR_BOOKING_CANCEL_MUTATION_RESOLVER_CATCH_STATE',
        },
      },
      SNAPLOGIC: {
        CATCH_ERROR: {
          code: 'ERR_BOOKING_CANCEL_SNAPLOGIC_CATCH_ERROR',
        },
        VALIDATION_ERROR: {
          code: 'ERR_BOOKING_CANCEL_SNAPLOGIC_VALIDATION_ERROR',
        },
      },
      TIME_VALIDATION: {
        NOT_ALLOWED: {
          code: 'ERR_CANCELATION_NOT_ALLOWED',
        },
      },
      UPDATE_BOOKING: {
        CATCH_ERROR: {
          code: 'ERR_BOOKING_CANCEL_OPERATION_CATCH_ERROR',
        },
        IS_NULL: {
          code: 'ERR_BOOKING_CANCEL_OPERATION_RETURN_NULL',
        },
      },
    },
  },
} as const;

export const AVAILABLE_SLOTS_ERRORS =
  GraphQLErrorResponses.BOOKING.AVAILABLE_SLOTS;
