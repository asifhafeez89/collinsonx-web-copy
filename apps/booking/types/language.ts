export interface LangObj {
  auth: AuthLang;
  lounge: LoungeLang;
  booking: bookingLang;
}

type AuthLang = {
  login: LoginProps;
  checkCode: CheckCodeProps;
  signUp: SignUpProps;
};

type LoginProps = {
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

type CheckCodeProps = {
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

type SignUpProps = {
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
  flightDetails: FlightDetailsProps;
  guestDetails: GuestDetailsProps;
  availableSlots: AvailableSlotsProps;
  confirmBooking: {
    title: string;
    text: string;
    btn: string;
  };
  payment: {
    btnGoPayment: string;
  };
  confirmationPayment: ConfirmationPaymentProps;
  cancellation: CancellationProps;
  checkAvailability: {
    arrivalTitle: string;
    notFoundError: string;
    btn: string;
  };
};

type FlightDetailsProps = {
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

type GuestDetailsProps = {
  title: string;
  description: (guests: number) => string;
  adultsInput: InputLang;
  childrenInput: InputLang;
  infantsInput: InputLang;
  loungeTerms: {
    line1: string;
    link: string;
    line2: string;
  };
  errors: {
    capacity: (guests: number) => string;
  };
};

type AvailableSlotsProps = {
  title: string;
  description: string;
  placeholder: string;
  arrivalDescription: string;
  stayTime: {
    line1: string;
    line2: string;
    line3: string;
  };
  totalPrice: {
    title: string;
  };
  panelInfoHeader: {
    date: string;
    flightTime: string;
    flightNumber: string;
  };
  cancellationPolicy: {
    title: string;
    descriptionLine1: string;
    descriptionLine2: string;
  };
  btn: string;
  errors: {
    airportMismatch: ScreenProps;
    terminalMismatch: ScreenProps;
    confirmation: string;
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

type CancellationProps = {
  policy: ScreenProps;
  unsuccesful: string;
  btn: string;
};

type ScreenProps = {
  title: string;
  description?: string;
  btn?: string | { [key: string]: string };
};

type ConfirmationPaymentProps = {
  title: string;
  processing: {
    beingProcessed: ScreenProps;
    unsuccessful: ScreenProps;
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
