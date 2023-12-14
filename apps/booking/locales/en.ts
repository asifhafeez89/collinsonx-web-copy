export default {
  auth: {
    login: {
      email: {
        title: 'Enter your email',
        input: {
          label: 'Enter your email address',
          description:
            'Please provide an email address we will use to communicate with you including all booking information.',
          placeholder: 'youremail@gmail.com',
        },
      },
      passwordText:
        'We will send you a one time passcode via email to proceed.',
      btnLogin: 'Continue',
      error: {
        emailFormat: 'Wrong email format, try again',
        emailError:
          'Please enter the correct email address or call support as this account is already linked to a different email address',
      },
    },
    checkCode: {
      title: 'Check your email',
      description: 'We have sent a unique code to ',
      wrongEmailTitle: 'Wrong email?',
      reEnterEmailLabel: 'Re-enter your email address',
      passcodeSubtitle: 'One time passcode',
      uniqueCodeText: (count: number) =>
        `You can resend the unique code in ${count} seconds`,
      btn: {
        resend: 'Resend',
        verify: 'Verify',
      },
      error: {
        wrongCode: 'Passcode may be incorrect or expired. Please try again.',
      },
    },
    signUp: {
      title: 'Update details',
      subtitle: 'You can update your details below',
      firstNameInput: {
        label: 'First name(s)',
        placeholder: 'John',
      },
      lastNameInput: {
        label: 'Last name(s)',
        placeholder: 'Smith',
      },
      emailInput: {
        label: 'Email address',
      },
      marketingAgreementText:
        'I agree to receive personalised marketing emails.',
      signUpButton: 'Login',
      validationError: {
        invalidEmail: 'Please enter a valid email address.',
        maxLength: 'Max length is 255 characters',
        emptyName: "Name can't be empty",
      },
      error: {
        signUpError: 'An error ocurred',
        attempts: {
          title: 'Sorry, too many wrong attempts',
          description:
            '5 incorrect attempts were made to enter the verification code. Please try again in an hour',
          btn: {
            reEnter: 'Re-enter email',
            contact: 'Contact support',
          },
        },
      },
    },
  },
  lounge: {
    perPerson: 'per person',
    errors: {
      capacity: {
        title: 'Lounge is at capacity',
        description: {
          known:
            "We're sorry, the lounge selected is at capacity at this time. You can try booking for a smaller number of guests or please check to see if another lounge is available.",
          notKnown:
            'Our apologies, but capacity of the lounge for the time slot you selected is 2 adults and 1 child.',
        },
        solutions: {
          title: 'You can',
          points: [
            'Change number of guests',
            'Change time slots',
            'Find another lounge',
          ],
        },
        btn: {
          change: 'Change guests number',
          return: 'Return to lounges',
        },
      },
      unavailable: {
        title: 'Lounge is unavailable',
        description:
          "Sorry, but we're unable to fulfill your request to book the lounge at the moment. We apologize for the inconvenience caused. Please try again later or contact our customer support for further assistance. Thank you for your understanding.",
      },
      terminalsMismatch: {
        title: 'Terminals mismatch',
        description:
          'Please note, that the lounge you are booking is not in the terminal your flight is scheduled. Lounge terminal is at North Terminal. Flight departure terminal is from South TerminalDo you still want to book this lounge even it is not in the terminal of departure?',

        btn: {
          return: 'Return to lounges',
          continue: "'Continue booking',",
        },
      },
    },
  },
  booking: {
    flightAndGuests: {
      title: 'Flight and guests entry',
    },
    flightDetails: {
      title: 'My flight details',
      dateInput: {
        label: 'Date',
        placeholder: 'Flight date',
      },
      numberInput: {
        label: 'Flight number',
        placeholder: 'E.g. EZY123',
      },
      time: {
        label: 'Time of flight',
      },
      errors: {
        invalid_date: 'Must provide date of flight.',
        invalid_dateflight:
          'Flight details not recognised. Please check and try again.',
        invalid_flight:
          'Flight details not recognised. Please check and try again.',
      },
    },
    guestDetails: {
      title: "Who's coming?",
      description: (guests: number) =>
        `Maximum group size is ${guests}, excluding infants. Please check availability for lounge-specific restrictions on number of infants.`,
      adultsInput: {
        label: 'Adults',
        description: 'Ages 12+',
      },
      childrenInput: {
        label: 'Children',
        description: 'Ages 2-11',
      },
      infantsInput: {
        label: 'Infants',
        description: 'Ages 0-2',
      },
      loungeTerms: {
        line1: 'Refer to ',
        link: 'lounge conditions',
        line2: 'for age restrictions',
      },
      errors: {
        capacity: (guests: number) =>
          `The maximum capacity of the lounge is a total of ${guests} guests. Change number of guests.`,
      },
    },
    availableSlots: {
      title: 'Estimated time of arrival',
      description:
        'Timeslots are shown in the time zone of the lounge location',
      placeholder: 'Select time',
      arrivalDescription: 'This is the time you will arrive at the lounge.',
      stayTime: {
        line1: 'As your flight is at ',
        line2: ', your maximum stay is ',
        line3: '3 hours prior',
      },
      totalPrice: {
        title: 'Total price',
      },
      panelInfoHeader: {
        date: 'Date',
        flightTime: 'Time of flight',
        flightNumber: 'Flight number',
      },
      cancellationPolicy: {
        title: 'Cancellation policy',
        descriptionLine1: `Cancel up to 48 hours before your booking to receive a full refund. Bookings cannot be cancelled within 48 hours of booking arrival time, including new bookings made within that time range.`,
        descriptionLine2:
          'Please confirm details are correct before making payment.',
      },
      btn: 'CONFIRM',
      errors: {
        airportMismatch: {
          title: `Airports don't match`,
          description:
            'The lounge you are booking is not in the same airport your flight is scheduled to depart from.',
        },
        terminalMismatch: {
          title: `Terminals don't match`,
          description:
            'The lounge you are booking is not in the same terminal your flight is scheduled to depart from.',
        },
        confirmation: 'Do you still want to go ahead with this booking?',
        estimatedTime: 'Select estimated arrival time',
        availabilityUnknown: {
          title: 'Availability is unknown',
          description:
            'Our apologies, but capacity for time slot you selected is unknown.',
          solutions: {
            title: 'You can',
            points: [
              'change number of guests',
              'change time slot',
              'find another lounge',
            ],
          },
          endText: 'Or try again later',
        },
        btn: {
          edit: 'Edit booking',
          return: 'Return to lounges',
        },
      },
    },
    confirmBooking: {
      title: 'Booking summary',
      text: 'Please confirm details are correct before making payment.',
      btn: 'Go to payment',
    },
    payment: {
      btnGoPayment: 'Go to payment',
      title: 'Payment information',
    },
    confirmationPayment: {
      title: 'Booking confirmation',
      processing: {
        beingProcessed: {
          title: 'Payment is being processed',
          description: {
            line1: 'Your payment for ',
            line2: 'is being processed.',
            line3:
              "Please don't refresh the page, it may take a few minutes to complete.",
          },
        },
        unsuccessful: {
          title: 'Payment is being unsuccessful',
          description:
            'Please, do not leave this screen neither close your browser until the action finishes ',
        },
      },
      outcome: {
        succesful: {
          title: 'Good news! Your booking has been confirmed',
          reference: {
            label: 'Booking Reference',
          },
          emailConfirmationLabel: 'A confirmation email has been sent to',
          description:
            'Our apologies, error occurred during the payment process and your payment was not processed. We kindly request you to either make a new booking or repeat your payment.',
          importantNotes: {
            title: 'Important Notes',
            notes: [
              'Please remember to bring your booking reference number, boarding pass and photo ID along with your Priority Pass membership card or eligible access method for check in at the lounge.',
              'Maximum stay is 3 hours prior to your flight time.',
              'Cancellation must be made at least 48 hours in advance of your visit date & time to receive a refund. No refund will be issued after this time.',
            ],
          },
          btn: {
            download: 'Download PDF Confiirmation',
            return: 'Return to lounge',
          },
        },
        notConfirmed: {
          title: "Your payment hasn't confirmed",
          description:
            'Our apologies, error occurred during the payment process and your payment was not processed. We kindly request you to either make a new booking or repeat your payment.',
          btn: {
            payment: 'Repeat payment',
            return: 'Return to lounge',
          },
        },
        delay: {
          title: 'Booking confirmation delay',
          description:
            'We are not able to confirm your booking yet, we will send you an email once your booking is confirmed',
          btn: 'Return to lounges',
        },
        delayError: {
          title: 'No confirmation received',
          description:
            'We are not able to confirm your booking yet, we will send you an email once your booking is confirmed',
          btn: 'Return to lounges',
        },
        declined: {
          title: 'Your booking has been declined',
          description:
            "Apologies for the delay in processing. Unfortunately, we couldn't confirm you booking. Please consider booking another time slot.",
          btn: {
            return: 'Return to lounges',
            select: 'Select another time',
          },
        },
      },
    },
    cancellation: {
      policy: {
        title: 'Cancellation policy',
        description:
          'Cancel up to 48 hours before your booking to receive a full refund. Bookings cannot be cancelled within 48 hours of booking arrival time, including new bookings made within that time range.',
      },
      unsuccesful:
        "We're sorry, this booking cannot be cancelled within 48 hours of booking arrival time",
      btn: 'Confirm',
    },
    checkAvailability: {
      arrivalTitle: 'Arrival time selection',
      notFoundError: 'Something went wrong, please try again',
      btn: 'CHECK AVAILABILITY',
    },
  },
};
