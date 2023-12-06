export interface LangObj {
  auth: AuthLang;
  lounge: LoungeLang;
  booking: bookingLang;
}

type AuthLang = {
  login: {
    email: {
      title: string;
      input: InputLang;
    };
    passwordText: string;
    btnLogin: string;
    error: {
      emailFormat: string;
      emailError: string;
    };
  };
  checkCode: {
    title: string;
    description: string;
    wrongEmailTitle: string;
    reEnterEmailLabel: string;
    passcodeSubtitle: string;
    uniqueCodeText: (count: number) => string;
    btn: {
      resend: string;
      verify: string;
    };
    error: {
      wrongCode: string;
    };
  };
  signUp: {
    title: string;
    subtitle: string;
    firstNameInput: {
      label: string;
      placeholder: string;
    };
    lastNameInput: {
      label: string;
      placeholder: string;
    };
    marketingAgreementText: string;
    signUpButton: string;
    error: {
      signUpError: string;
      attempts: {
        title: string;
        description: string;
        btn: {
          reEnter: string;
          contact: string;
        };
      };
    };
  };
};

type LoungeLang = {
  perPerson: string;
  errors: {
    capacity: {
      title: string;
      description: {
        known: string;
        notKnown: string;
      };
      solutions: {
        title: string;
        points: string[];
      };
      btn: {
        change: string;
        return: string;
      };
    };
    unavailable: SmallScreenLang;
    terminalsMismatch: SmallScreenLang;
  };
};

type bookingLang = {
  flightAndGuests: {
    title: string;
  };
  flightDetails: {
    title: string;
    dateInput: InputLang;
    numberInput: InputLang;
    time: InputLang;
    errors: {
      invalid_date: string;
      invalid_dateflight: string;
      invalid_flight: string;
    };
  };
  guestDetails: {
    title: string;
    description: (guests: number) => string;
    adultsInput: InputLang;
    childrenInput: InputLang;
    infantsInput: InputLang;
    loungeTerms: string;
    errors: {
      capacity: string;
    };
  };
  availableSlots: {
    title: string;
    description: string;
    arrivalDescription: string;
    stayTime: (flightTime: number) => string;
    totalPrice: {
      title: string;
    };
    btn: string;
    errors: {
      estimatedTime: string;
      availabilityUnknown: {
        title: string;
        description: string;
        solutions: {
          title: string;
          points: string[];
        };
        endText: string;
      };
      btn: {
        edit: string;
        return: string;
      };
    };
  };
  confirmBooking: {
    title: string;
    text: string;
    btn: string;
  };
  payment: {
    btnGoPayment: string;
  };
  confirmationPayment: {
    title: string;
    processing: {
      beingProcessed: {
        title: string;
        description: string;
      };
      unsuccessful: {
        title: string;
        description: string;
      };
    };
    outcome: {
      succesful: {
        title: string;
        reference: {
          label: string;
        };
        description: string;
        importantNotes: {
          title: string;
          notes: string[];
        };
        btn: {
          download: string;
          return: string;
        };
      };
      notConfirmed: {
        title: string;
        description: string;
        btn: {
          payment: string;
          return: string;
        };
      };
      delay: SmallScreenLang;
      delayError: SmallScreenLang;
      declined: SmallScreenLang;
    };
  };
  cancellation: {
    policy: {
      title: string;
      description: string;
    };
    unsuccesful: string;
    btn: string;
  };
  checkAvailability: {
    btn: string;
  };
};

type InputLang = {
  label: string;
  placeholder?: string;
  description?: string;
};

type SmallScreenLang = {
  title: string;
  description?: string;
  btn?: string | { [key: string]: string };
};
