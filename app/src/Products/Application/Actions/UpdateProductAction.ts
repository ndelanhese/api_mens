import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infraestructure/Repositories/ProductRepository';
import UpdateProductInputData from '../Dtos/UpdateProductInputData';

export default class UpdateProductAction {
  async execute(
    input: UpdateProductInputData,
    currentValue: Product,
  ): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product(
      input.manufacturer_slug || currentValue.getManufacturerSlug(),
      input.type || currentValue.getType(),
      input.part_number || currentValue.getPartNumber(),
      input.description || currentValue.getDescription(),
      input.currency || currentValue.getCurrency(),
      input.contributor_price || currentValue.getContributorPrice(),
      input.outlet || currentValue.isOutlet(),
      input.note || currentValue.getNote(),
      input.exempt_price || currentValue.getExemptPrice(),
      currentValue.getId(),
    );
    return await productRepository.save(product);
  }
}
