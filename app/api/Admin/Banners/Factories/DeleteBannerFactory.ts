import DeleteBannerInputData from '@app/src/Banners/Application/Dtos/DeleteBannerInputData';
import { IBanner } from './DeleteBannerFactory.types';

export default class DeleteBannerFactory {
  static fromRequest(bannerPayload: IBanner) {
    return new DeleteBannerInputData(
      bannerPayload.id,
      bannerPayload.title,
      bannerPayload.area,
      bannerPayload.desktop_image,
      bannerPayload.mobile_image,
      bannerPayload.url,
      bannerPayload.start_date,
      bannerPayload.end_date,
      bannerPayload.status,
    );
  }
}
