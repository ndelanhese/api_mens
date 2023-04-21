import BrandsRepository from '../../Infrastructure/Repositories/BrandsRepository';
import DeleteBrandInputData from '../Dtos/DeleteBrandInputData';

export default class DeleteBrandAction {
  async execute(input: DeleteBrandInputData): Promise<void> {
    const brandRepository = new BrandsRepository();
    await brandRepository.delete(input.id);
  }
}
