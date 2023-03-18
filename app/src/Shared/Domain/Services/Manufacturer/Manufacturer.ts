export default class Manufacturer {
  public static nameToSlug(name: string): string {
    const regex = /[\d\s.,?!'":;()_\-+={}[\]<>^~#&*@]/g;
    const slug = name.toUpperCase().replace(regex, '-');
    return slug;
  }

  public static nameLabel(name: string): string {
    const regexOnlyLetters = /[^a-zA-Z\s]/g;
    const regexFirstLetterUpperCase = /(^|\s)\w/g;
    const slug = name
      .toLowerCase()
      .replace(regexOnlyLetters, ' ')
      .replace(regexFirstLetterUpperCase, match => match.toUpperCase());

    return slug;
  }

  public static getNameFromURL(url: string): string {
    return url.split('?')[0].replace('/', '');
  }
}
