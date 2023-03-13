import Media from "@app/src/Extras/Domain/Entities/Media";

export default class Banner {
  private id?: number;
  private order: number;
  private title: string;
  private area: string;
  private desktopImage: Media;
  private mobileImage: Media;
  private url?: string;
  private startDate?: Date;
  private endDate?: Date;
  private status: string = 'unpublished';

  constructor(
    order: number,
    title: string,
    area: string,
    desktopImage: Media,
    mobileImage: Media,
    url?: string,
    startDate?: Date,
    endDate?: Date,
    status: string = 'unpublished',
    id?: number,
  ) {
    this.id = id;
    this.order = order;
    this.title = title;
    this.area = area;
    this.desktopImage = desktopImage;
    this.mobileImage = mobileImage;
    this.url = url;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
    return this;
  }

  getOrder() {
    return this.order;
  }

  setOrder(order: number) {
    this.order = order;
    return this;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  getArea() {
    return this.area;
  }

  setArea(area: string) {
    this.area = area;
    return this;
  }

  getDesktopImage() {
    return this.desktopImage;
  }

  setDesktopImage(desktopImage: Media) {
    this.desktopImage = desktopImage;
    return this;
  }

  getMobileImage() {
    return this.mobileImage;
  }

  setMobileImage(mobileImage: Media) {
    this.mobileImage = mobileImage;
    return this;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  getStartDate() {
    return this.startDate;
  }

  setStartDate(startDate: Date) {
    this.startDate = startDate;
    return this;
  }

  getEndDate() {
    return this.endDate;
  }

  setEndDate(endDate: Date) {
    this.endDate = endDate;
    return this;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: string) {
    this.status = status;
    return this;
  }
}
