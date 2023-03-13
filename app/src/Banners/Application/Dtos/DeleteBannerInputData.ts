export default class DeleteBannerInputData {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly area: string,
    readonly desktop_image: {
      id: number;
      url: string;
    },
    readonly mobile_image: {
      id: number;
      url: string;
    },
    readonly url?: string,
    readonly start_date?: Date,
    readonly end_date?: Date,
    readonly status?: string,
  ) {}
}
