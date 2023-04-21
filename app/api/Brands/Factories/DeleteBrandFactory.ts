import DeleteBrandInputData from '@app/src/Brands/Application/Dtos/DeleteBrandInputData';
import { Request } from 'express';

export default class DeleteBrandFactory {
  static fromRequest(req: Request) {
    return new DeleteBrandInputData(Number(req.params.id));
  }
}
