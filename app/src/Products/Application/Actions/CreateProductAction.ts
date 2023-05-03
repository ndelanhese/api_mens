import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import CreateProductInputData from '../Dtos/CreateProductInputData';

export default class CreateProductAction {
  async execute(input: CreateProductInputData): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product(
      input.part_number,
      input.name,
      input.description,
      input.price,
      input.quantity,
      //TODO -> adicionar: categoria, marca e fornecedor
    );
    return await productRepository.save(product);
  }
}
