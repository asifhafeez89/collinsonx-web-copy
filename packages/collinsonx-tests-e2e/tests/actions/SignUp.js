import SignUpPage from '../pages/SignUpPage';

class SignUp {
  constructor(page) {
    this._signUpPage = new SignUpPage(page);
  };
};

module.exports = SignUp;