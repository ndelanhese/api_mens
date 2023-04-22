import DeleteCategoryInputData from '@app/src/Categories/Application/Dtos/DeleteCategoryInputData';
import { Request } from 'express';

export default class DeleteCategoryFactory {
  static fromRequest(req: Request) {
    return new DeleteCategoryInputData(Number(req.params.id));
  }
}
