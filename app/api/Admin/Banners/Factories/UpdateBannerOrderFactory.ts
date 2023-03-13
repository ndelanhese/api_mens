import UpdateBannerOrderInputData from '@app/src/Banners/Application/Dtos/UpdateBannerOrderInputData';
import { Request } from 'express';

export default class UpdateBannerOrderFactory {
  static fromRequest(req: Request) {
    return new UpdateBannerOrderInputData(req.body);
  }
}
