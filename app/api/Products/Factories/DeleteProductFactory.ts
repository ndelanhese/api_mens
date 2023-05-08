import DeleteProductInputData from '@app/src/Products/Application/Dtos/DeleteProductInputData';
import { Request } from 'express';

export default class DeleteProductFactory {
  static fromRequest(req: Request) {
    return new DeleteProductInputData(Number(req.params.id));
  }
}
