import UpdateBrandInputData from '@app/src/Brands/Application/Dtos/UpdateBrandInputData';
import Brand from '@app/src/Brands/Domain/Entities/Brand';
import { Request } from 'express';

import { IBrand } from './UpdateBrandFactory.types';

export default class UpdateBrandFactory {
  static fromRequest(req: Request) {
    return new UpdateBrandInputData(Number(req.params.id), req.body.name);
  }
  static fromCurrentBrand(brand: IBrand) {
    return new Brand(brand.name, brand.id);
  }
}
