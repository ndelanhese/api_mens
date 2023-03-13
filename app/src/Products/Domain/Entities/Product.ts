export default class Product {
  private id?: number;
  private manufacturer_slug: string;
  private type: string;
  private part_number: string;
  private description: string;
  private currency: string;
  private contributor_price: number;
  private exempt_price?: number;
  private note?: string;
  private outlet: boolean;

  constructor(
    manufacturer_slug: string,
    type: string,
    part_number: string,
    description: string,
    currency: string = 'R$',
    contributor_price: number,
    outlet: boolean,
    note?: string,
    exempt_price?: number,
    id?: number,
  ) {
    this.id = id;
    this.manufacturer_slug = manufacturer_slug;
    this.type = type;
    this.part_number = part_number;
    this.description = description;
    this.currency = currency;
    this.contributor_price = contributor_price;
    this.exempt_price = exempt_price;
    this.note = note;
    this.outlet = outlet;
  }

  getId() {
    return this.id;
  }

  setId(id?: number) {
    this.id = id;
    return this;
  }

  getManufacturerSlug() {
    return this.manufacturer_slug;
  }

  setManufacturerSlug(manufacturer_slug: string) {
    this.manufacturer_slug = manufacturer_slug;
    return this;
  }

  getType() {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  getPartNumber() {
    return this.part_number;
  }

  setPartNumber(part_number: string) {
    this.part_number = part_number;
    return this;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  getCurrency() {
    return this.currency;
  }

  setCurrency(currency: string) {
    this.currency = currency;
    return this;
  }

  getContributorPrice() {
    return this.contributor_price;
  }

  setContributorPrice(contributor_price: number) {
    this.contributor_price = contributor_price;
    return this;
  }

  getExemptPrice() {
    return this.exempt_price;
  }

  setExemptPrice(exempt_price?: number) {
    this.exempt_price = exempt_price;
    return this;
  }

  getNote() {
    return this.note;
  }

  setNote(note?: string) {
    this.note = note;
    return this;
  }

  isOutlet() {
    return this.outlet;
  }

  setOutlet(outlet: boolean) {
    this.outlet = outlet;
    return this;
  }
}
