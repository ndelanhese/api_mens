import { capitalizeFirstLetter } from '@app/src/Shared/Infrastructure/Utils/String';

import Brand from '../../Domain/Entities/Brand';
import BrandsRepository from '../../Infrastructure/Repositories/BrandsRepository';
import CreateBrandInputData from '../Dtos/CreateBrandInputData';

export default class CreateBrandAction {
  async execute(input: CreateBrandInputData): Promise<Brand> {
    const brandRepository = new BrandsRepository();
    const brand = new Brand(capitalizeFirstLetter(input.name));
    return await brandRepository.save(brand);
  }
}
