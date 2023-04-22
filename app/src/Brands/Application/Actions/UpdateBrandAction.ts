import Brand from '../../Domain/Entities/Brand';
import BrandsRepository from '../../Infrastructure/Repositories/BrandsRepository';
import UpdateBrandInputData from '../Dtos/UpdateBrandInputData';

export default class UpdateBrandAction {
  async execute(
    input: UpdateBrandInputData,
    currentValue: Brand,
  ): Promise<void> {
    const brandsRepository = new BrandsRepository();
    const brand = new Brand(
      input.name || currentValue.getName(),
      input.id || currentValue.getId(),
    );
    await brandsRepository.update(brand);
  }
}
