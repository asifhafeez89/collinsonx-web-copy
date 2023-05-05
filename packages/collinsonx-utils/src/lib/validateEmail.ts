function validateEmail(input: string) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input);
}

export default validateEmail;
