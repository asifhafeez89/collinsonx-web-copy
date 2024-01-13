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
    maintenance: {
      title: 'Maintenance underway',
      description:
        "We're sorry, the booking service is temporarily unavailable as a system update is being performed. Please check back later or Contact support.",
      note: 'Please return later or',
      btn: {
        support: 'Contact support',
      },
    },
    notFound: {
      title: '404 - Page not found',
      description:
        'The page you are looking for might have been removed or is temporarily unavailable.',
      btn: {
        returnToLounge: 'RETURN TO LOUNGE',
        support: 'Contact support',
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
    topBarLinks: {
      backToLounge: 'BACK TO ',
      faqs: 'FAQs',
    },
  },
  booking: {
    flightAndGuests: {
      title: 'Flight and guests entry',
    },
    flightDetails: {
      title: 'My flight details',
      localeValue: 'en',
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
        samePrice: 'No additional fee required',
      },
      panelInfoHeader: {
        date: 'Date',
        flightTime: 'Time of flight',
        flightNumber: 'Flight number',
      },
      hsbcCancelationPolicy: {
        title: 'Please note a pre-booking fee applies for HSBC cardholders',
        descriptionLine1: `For HSBC Premier cardholders, this pre-booking fee will be added on top of your and your guest(s)'s visit passes fees. When you arrive at the lounge you will still be required to pay £24 per visitor.`,
        descriptionLine2:
          'For HSBC Premier World Elite cardholders, please note whilst you do receive free visit passes for yourself and any additional cardholders (i.e., not your guests) - the pre-booking fee will act as a separate fee, and also apply to you and your guests. When you arrive at the lounge any guests who are not the primary or additional cardholder will be required to pay £24 per visitor.',
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
      amendTitle: 'Booking amendment summary',
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
            download: 'DOWNLOAD BOOKING CONFIRMATION',
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
      title: 'Booking Cancellation',
      description: 'You are about to cancel the booking, are you sure?',
      reference: 'Booking Reference:',
      btnCancel: 'CANCEL BOOKING',
      btnClose: 'CLOSE',
      policy: {
        title: 'Cancellation policy',
        description:
          'Cancel up to 48 hours before your booking to receive a full refund. Bookings cannot be cancelled within 48 hours of booking arrival time, including new bookings made within that time range.',
      },
      unsuccesful:
        "We're sorry, this booking cannot be cancelled within 48 hours of booking arrival time",
      btn: 'Confirm',
      errors: {
        notFound: 'The booking cannot be found',
        alreadyCancelled: 'The booking has been already cancelled',
        notOwned:
          'Sorry, something went wrong with your booking, please try again later or contact support',
        failed:
          'Sorry, something went wrong with your booking, please try again later or contact support',
        notAllowed:
          "We're sorry, this booking cannot be cancelled within 48 hours of booking arrival time.",
        wrong:
          'Sorry, something went wrong with your booking, please try again later or contact supports',
      },
      confirmation: {
        title: {
          Cancel: 'Your booking has been cancelled',
          Failed:
            'Your booking cancellation has failed, please contact our team',
          NotCancel:
            'Your booking could not be cancelled, please contact our team',
        },
        email: 'A confirmation email has been sent to',
        refund:
          ' Your payment for this booking will be refunded within 10 days',
        reBook: {
          line1: 'If you didn’t mean to cancel please re-book through ',
          line2: '. We hope to see you next time.',
        },
        loading: 'Loading',
      },
    },
    checkAvailability: {
      arrivalTitle: 'Arrival time selection',
      amendTitle: 'Booking amendments',
      notFoundError: 'Something went wrong, please try again',
      btn: 'CHECK AVAILABILITY',
    },
    failureBooking: {
      declined: {
        title: 'Your booking has been declined.',
        description:
          "We're sorry but during the payment process the capacity for the lounge changed and we are no longer able to confirm your booking. You will be refunded any payment made.",
        note: 'Please consider booking another time slot, or check to see if another lounge is available.',
        btn: {
          selectAnotherTime: 'SELECT ANOTHER TIME',
          returnToLounge: 'Return to lounges',
        },
      },
    },
    confirmationPDF: {
      title: 'Booking Confirmation',
      description: {
        line1: 'Good news! Your booking for',
        line2: 'at',
        line3: 'has been confirmed.',
      },
      bookingDetails: {
        title: 'Your booking details',
        reference: 'Booking reference:',
        date: 'Date:',
        flightNumber: 'Flight number:',
        timeOfArrival: 'Estimated time of arrival:',
      },
      guestDetails: {
        title: "Who's coming?",
        adults: 'Adults',
        children: 'Children',
        infants: 'Infants',
      },
      price: 'Total',
      importantNotes: {
        title: 'Important Notes',
        notes: [
          'Please remember to bring your booking reference number, boarding pass and photo ID along with your Priority Pass membership card or eligible access method for check in at the lounge.',
          'Maximum stay is 3 hours prior to your flight time.',
          ' Cancellation must be made at least 48 hours in advance of your visit date & time to receive a refund. No refund will be issued after this time.  ',
        ],
      },
      cancelText: 'Click here to cancel your booking',
      forwardText: 'We look forward to seeing you there!',
      loadingText: 'Loading document...',
      error:
        'An error occurred while generating your booking confirmation! Please try again.',
    },
  },
  generic: {
    error: {
      latestAppVersion:
        'There might be an error in the system. Please make sure to update to the latest version of the app.',
      webTitle:
        'There might be an error in the system. Please try again or browse other options.',
    },
  },
};
