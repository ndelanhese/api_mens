export const validatePisPasep = (number: string): boolean => {
  const cleanedNumber = number.replace(/\D/g, '');
  if (cleanedNumber.length !== 11) {
    return false;
  }
  const REPEATED_DIGITS_REGEX = /^(\d)\1+$/;
  if (REPEATED_DIGITS_REGEX.test(cleanedNumber)) {
    return false;
  }
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const verificationDigit = Number(cleanedNumber.charAt(10));
  const sum = cleanedNumber
    .slice(0, 10)
    .split('')
    .map((digit, index) => Number(digit) * weights[index])
    .reduce((acc, curr) => acc + curr, 0);

  const remainder = sum % 11;
  const result = 11 - remainder;

  return (
    result === verificationDigit || (result === 10 && verificationDigit === 0)
  );
};
