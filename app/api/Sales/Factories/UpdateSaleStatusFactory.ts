import UpdateSaleStatusInputData from '@app/src/Sales/Application/Dtos/UpdateSaleStatusInputData';
import { Request } from 'express';

export default class UpdateSaleStatusFactory {
  static fromRequest(req: Request) {
    return new UpdateSaleStatusInputData(
      Number(req.params.id),
      req.body.observation,
      req.body.status,
    );
  }
}
