import Brand from '../../Domain/Entities/Brand';
import BrandsRepository from '../../Infrastructure/Repositories/BrandsRepository';
import CreateBrandInputData from '../Dtos/CreateBrandInputData';

export default class CreateBrandAction {
  async execute(input: CreateBrandInputData): Promise<Brand> {
    const brandRepository = new BrandsRepository();
    const user = new Brand(input.name);
    return await brandRepository.save(user);
  }
}
