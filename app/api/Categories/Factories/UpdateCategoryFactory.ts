import UpdateCategoryInputData from '@app/src/Categories/Application/Dtos/UpdateCategoryInputData';
import Category from '@app/src/Categories/Domain/Entities/Category';
import { Request } from 'express';

import { ICategory } from './UpdateCategoryFactory.types';

export default class UpdateCategoryFactory {
  static fromRequest(req: Request) {
    return new UpdateCategoryInputData(Number(req.params.id), req.body.name);
  }
  static fromCurrentCategory(brand: ICategory) {
    return new Category(brand.name, brand.id);
  }
}
