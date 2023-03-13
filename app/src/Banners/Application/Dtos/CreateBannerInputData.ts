import fileUpload from 'express-fileupload';
export default class CreateBannerInputData {
  constructor(
    readonly title: string,
    readonly area: string,
    readonly desktop_image: fileUpload.UploadedFile,
    readonly mobile_image: fileUpload.UploadedFile,
    readonly url?: string,
    readonly start_date?: Date,
    readonly end_date?: Date,
    readonly status: string = 'unpublished',
  ) {}
}
