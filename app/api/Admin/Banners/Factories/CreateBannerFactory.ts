import HttpError from '@exceptions/HttpError';
import CreateBannerInputData from '@app/src/Banners/Application/Dtos/CreateBannerInputData';

import { Request } from 'express';

export default class CreateBannerFactory {
  static fromRequest(req: Request) {
    const desktopImage = req?.files?.desktop_image;
    const mobileImage = req?.files?.mobile_image;

    if (
      !desktopImage ||
      !mobileImage ||
      Array.isArray(desktopImage) ||
      Array.isArray(mobileImage)
    ) {
      throw new HttpError(400, 'Arquivo inválido.');
    }

    return new CreateBannerInputData(
      req.body.title,
      req.body.area,
      desktopImage,
      mobileImage,
      req.body.url,
      req.body.start_date ? new Date(req.body.start_date) : undefined,
      req.body.end_date ? new Date(req.body.end_date) : undefined,
      req.body.status,
    );
  }
}
