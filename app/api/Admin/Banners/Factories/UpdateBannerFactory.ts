import Media from '@app/src/Extras/Domain/Entities/Media';
import Banner from '@app/src/Banners/Domain/Entities/Banner';
import { IBannerModelResponseWithMedia } from './UpdateBannerFactory.types';
import UpdateBannerInputData from '@app/src/Banners/Application/Dtos/UpdateBannerInputData';
import { Request } from 'express';
import HttpError from '@exceptions/HttpError';

export default class UpdateBannerFactory {
  static fromRequest(req: Request) {
    const desktopImage = req?.files?.desktop_image;
    const mobileImage = req?.files?.mobile_image;
    if (Array.isArray(desktopImage) || Array.isArray(mobileImage)) {
      throw new HttpError(400, 'Arquivo inválido.');
    }
    return new UpdateBannerInputData(
      req.body.order,
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

  static currentBannerFactory = (
    bannerPayload: IBannerModelResponseWithMedia,
  ) => {
    const { desktop_image } = bannerPayload;
    const { mobile_image } = bannerPayload;
    const desktopImage = new Media(
      desktop_image.name,
      desktop_image.mimetype,
      desktop_image.size,
      desktop_image.url,
      desktop_image.extension,
      desktop_image.path,
      desktop_image.key,
      desktop_image.visibility,
      desktop_image.data,
      desktop_image.id,
    );
    const mobileImage = new Media(
      mobile_image.name,
      mobile_image.mimetype,
      mobile_image.size,
      mobile_image.url,
      mobile_image.extension,
      mobile_image.path,
      mobile_image.key,
      mobile_image.visibility,
      mobile_image.data,
      mobile_image.id,
    );
    const banner = new Banner(
      bannerPayload.order,
      bannerPayload.title,
      bannerPayload.area,
      desktopImage,
      mobileImage,
      bannerPayload.url,
      bannerPayload.start_date,
      bannerPayload.end_date,
      bannerPayload.status,
      bannerPayload.id,
    );
    return banner;
  };
}
