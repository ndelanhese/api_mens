import Brand from '../../Domain/Entities/Brand';
import BrandsRepository from '../../Infrastructure/Repositories/BrandsRepository';
import UpdateBrandInputData from '../Dtos/UpdateBrandInputData';

export default class UpdateBrandAction {
  async execute(
    input: UpdateBrandInputData,
    currentValue: Brand,
  ): Promise<void> {
    const userRepository = new BrandsRepository();
    const user = new Brand(
      input.name || currentValue.getName(),
      input.id || currentValue.getId(),
    );
    await userRepository.update(user);
  }
}
