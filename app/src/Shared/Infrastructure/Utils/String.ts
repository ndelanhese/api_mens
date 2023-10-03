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

export const capitalizeFirstLetter = <T extends string | null | undefined>(
  input: T,
): T => {
  if (!input) return input as T;

  return (input.trim().charAt(0).toUpperCase() + input.slice(1)) as T;
};

export const capitalizeWords = <T extends string | null | undefined>(
  input: T,
): T => {
  if (!input) return input as T;

  const words = input.trim().split(' ');

  const capitalizedWords = words.map(word => {
    return word[0].toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ') as T;
};
