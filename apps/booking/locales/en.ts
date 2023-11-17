export default {
  auth: {
    login: {
      emailTitle: 'Enter your email address',
      emailDesc:
        'Please provide an email address we will use to communicate with you including all booking information.',
      emailInputLabel: 'Email address',
      emailInputPlaceholder: 'youremail@gmail.com',
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
      checkCodeTitle: 'Check your email',
      checkCodeDescription: (email: string) =>
        `We have sent a unique code to ${email}`,
      wrongEmailTitle: 'Wrong email?',
      reEnterEmailLabel: 'Re-enter your email address',
      passcodeSubtitle: 'One time passcode',
      uniqueCodeText: 'You can resend the unique code in 4 seconds',
      btnResend: 'Resend',
      btnVerify: 'Verify',
      error: {
        wrongCode:
          'Perhaps a code is invalid or has expired. Please try again.',
      },
    },
    signUp: {
      signUpTitle: 'Update details',
      signUpTitleDetails: 'You can update your details below',
      firstNameLabel: 'First name(s)',
      firstNamePlaceholder: 'John',
      lastNameLabel: 'Last name(s)',
      lastNamePlaceholder: 'Smith',
      marketingAgreementText:
        'I agree to receive personalised marketing emails.',
      signUpButton: 'Confirm',
      error: {
        signUpError: 'An error ocurred',
      },
    },
  },
};
