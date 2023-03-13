import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infraestructure/Repositories/ProductRepository';
import CreateProductInputData from '../Dtos/CreateProductInputData';

export default class CreateProductAction {
  async execute(input: CreateProductInputData): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product(
      input.manufacturer_slug,
      input.type,
      input.part_number,
      input.description,
      input.currency,
      input.contributor_price,
      input.outlet,
      input.note,
      input.exempt_price,
    );
    return await productRepository.save(product);
  }
}
