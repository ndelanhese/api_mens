import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import CreateProductInputData from '../Dtos/CreateProductInputData';

import { IProduct } from './CreateProductAction.types';

export default class CreateProductAction {
  async execute(input: CreateProductInputData): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product(
      // input.part_number,
      '',
      input.name,
      input.description,
      input.price,
      input.quantity,
      //TODO -> adicionar: categoria, marca e fornecedor
    );
    return await productRepository.save(product);
  }

  generatePartNumber(product: IProduct): string {
    const brandName = product.brand.name.slice(0, 3).toUpperCase();
    const categoryName = product.category.name.toUpperCase();
    const productId = product.id.toString();
    const categoryAbbreviation = categoryName
      .split(' ')
      .map(word => word[0])
      .join('');
    return `${brandName}-${categoryAbbreviation}-${productId}`;
  }
}
