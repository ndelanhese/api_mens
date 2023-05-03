import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import DeleteProductInputData from '../Dtos/DeleteProductInputData';

export default class DeleteProductAction {
  async execute(input: DeleteProductInputData): Promise<void> {
    const productRepository = new ProductRepository();
    return await productRepository.delete(input.id);
  }
}
