export const getUpperString = (value: string): string => {
  return String(value).toUpperCase().trim();
};

export const getLowerString = (value: string): string => {
  return String(value).toLowerCase().trim();
};

export const getSlugName = (name: string): string => {
  const regex = /[\d\s.,?!'":;()_\-+={}[\]<>^~#&*@]/g;
  const slug = name.replace(regex, '-');
  return getUpperString(slug);
};

export const getSlugManufacturerName = (name: string): string => {
  const slug = getSlugName(name).replace('-', '_');
  return slug;
};

export const getNameFromURLByList = (url: string): string => {
  return url.split('?')[0].replace('/', '').replace('_', '-');
};

export const getNameFromURL = (url: string): string => {
  return url.split('/')[1].replace('/', '').replace('_', '-');
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
