import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import UpdateProductInputData from '../Dtos/UpdateProductStockInputData';

export default class UpdateProductStockAction {
  async execute(input: UpdateProductInputData) {
    const { id, quantity, status } = input;
    const productRepository = new ProductRepository();
    await productRepository.updateStock(id, quantity, status);
  }
}
