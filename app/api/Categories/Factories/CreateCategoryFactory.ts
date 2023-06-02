import CreateCategoryInputData from '@app/src/Categories/Application/Dtos/CreateCategoryInputData';
import { Request } from 'express';

export default class CreateCategoryFactory {
  static fromRequest(req: Request) {
    return new CreateCategoryInputData(req.body.name);
  }
}
