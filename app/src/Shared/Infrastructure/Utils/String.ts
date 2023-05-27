export const getSlugName = (name: string): string => {
  const regex = /[\d\s.,?!'":;()_\-+={}[\]<>^~#&*@]/g;
  const slug = name.replace(regex, '-');
  return slug.toUpperCase();
};

export const nameLabel = (name: string): string => {
  const regexOnlyLetters = /[^a-zA-Z\s]/g;
  const regexFirstLetterUpperCase = /(^|\s)\w/g;
  const label = name
    .toLowerCase()
    .replace(regexOnlyLetters, ' ')
    .replace(regexFirstLetterUpperCase, match => match.toUpperCase());

  return label;
};

export const extractNumbersFromString = (input: string): string => {
  const EXTRACT_ONLY_NUMBERS_REGEX = /[\d]/g;
  const numbersOnly = input.replace(EXTRACT_ONLY_NUMBERS_REGEX, '');
  return numbersOnly;
};
