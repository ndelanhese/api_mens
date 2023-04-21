import CreateBrandInputData from '@app/src/Brands/Application/Dtos/CreateBrandInputData';
import { Request } from 'express';

export default class CreateBrandFactory {
  static fromRequest(req: Request) {
    return new CreateBrandInputData(req.body.name);
  }
}
