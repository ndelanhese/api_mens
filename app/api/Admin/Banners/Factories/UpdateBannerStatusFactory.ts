import UpdateBannerStatusInputData from '@app/src/Banners/Application/Dtos/UpdateStatusBannerInputData';
import { Request } from 'express';

export default class UpdateBannerStatusFactory {
  static fromRequest(req: Request) {
    const { id: bannerId } = req.params;
    const { status } = req.body;
    return new UpdateBannerStatusInputData(Number(bannerId), status);
  }
}
