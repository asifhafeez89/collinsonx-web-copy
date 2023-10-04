import validator from 'validator';

function validateEmail(input: string) {
  return validator.isEmail(input);
}

export default validateEmail;
