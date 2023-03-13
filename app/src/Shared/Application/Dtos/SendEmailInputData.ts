export default class SendEmailInputData {
  constructor(
    readonly from: string,
    readonly to: string[] | string,
    readonly cc: string[] | string,
    readonly subject: string,
    readonly html: string,
  ) {}
}
