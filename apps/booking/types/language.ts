export interface LangObj {
  auth: AuthLang;
  lounge: LoungeLang;
  booking: BookingLang;
  generic: GenericLang;
}

type GenericLang = {
  error: {
    latestAppVersion: string;
    webTitle: string;
  };
};

type AuthLang = {
  login: LoginProps;
  checkCode: CheckCodeProps;
  signUp: SignUpProps;
  maintenance: {
    title: string;
    description: string;
    note: string;
    btn: {
      support: string;
    };
  };
  notFound: {
    title: string;
    description: string;
    btn: {
      returnToLounge: string;
      support: string;
    };
  };
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
  emailInput: {
    label: string;
  };
  marketingAgreementText: string;
  signUpButton: string;
  validationError: {
    invalidEmail: string;
    maxLength: string;
    emptyName: string;
  };
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
  topBarLinks: {
    backToLounge: string;
    faqs: string;
  };
};

type BookingLang = {
  flightAndGuests: {
    title: string;
  };
  flightDetails: FlightDetailsProps;
  guestDetails: GuestDetailsProps;
  availableSlots: AvailableSlotsProps;
  confirmBooking: {
    title: string;
    amendTitle: string;
    text: string;
    btn: string;
  };
  payment: {
    btnGoPayment: string;
    title: string;
  };
  confirmationPayment: ConfirmationPaymentProps;
  cancellation: CancellationProps;
  checkAvailability: {
    arrivalTitle: string;
    amendTitle: string;
    notFoundError: string;
    btn: string;
    confirmModal: SmallScreenLang;
  };
  failureBooking: {
    declined: {
      title: string;
      description: string;
      note: string;
      btn: {
        selectAnotherTime: string;
        returnToLounge: string;
      };
    };
  };
  confirmationPDF: confirmationPDFProps;
};

type confirmationPDFProps = {
  title: string;
  description: {
    line1: string;
    line2: string;
    line3: string;
  };
  bookingDetails: {
    title: string;
    reference: string;
    date: string;
    flightNumber: string;
    timeOfArrival: string;
  };
  guestDetails: {
    title: string;
    adults: string;
    children: string;
    infants: string;
  };
  price: string;
  importantNotes: {
    title: string;
    notes: string[];
  };
  cancelText: string;
  forwardText: string;
  loadingText: string;
  error: string;
};

type FlightDetailsProps = {
  title: string;
  localeValue: string;
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
    samePrice: string;
    title: string;
  };
  panelInfoHeader: {
    date: string;
    flightTime: string;
    flightNumber: string;
  };
  hsbcCancelationPolicy: {
    title: string;
    descriptionLine1: string;
    descriptionLine2: string;
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
  title: string;
  description?: string;
  reference: string;
  btnCancel: string;
  btnClose: string;
  policy: ScreenProps;
  unsuccesful: string;
  btn: string;
  errors: CancellationErrosProps;
  confirmation: CancelConfirmationProps;
};

type CancelConfirmationProps = {
  title: {
    Cancel: string;
    Failed: string;
    NotCancel: string;
  };
  email: string;
  refund: {
    failed: string;
    successful: string;
  };
  reBook: {
    line1: string;
    line2: string;
  };
  loading: string;
};

type CancellationErrosProps = {
  notFound: string;
  alreadyCancelled: string;
  notOwned: string;
  failed: string;
  notAllowed: string;
  wrong: string;
};

type ScreenProps = {
  title: string;
  description?: string;
  btn?: string | { [key: string]: string };
};

type ConfirmationPaymentProps = {
  title: string;
  processing: {
    beingProcessed: {
      title: string;
      description: {
        line1: string;
        line2: string;
        line3: string;
      };
    };
    unsuccessful: ScreenProps;
  };
  outcome: {
    succesful: {
      title: string;
      reference: {
        label: string;
      };
      emailConfirmationLabel: string;
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
    delay: {
      title: string;
      description?: string;
      btn?: string;
    };
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
