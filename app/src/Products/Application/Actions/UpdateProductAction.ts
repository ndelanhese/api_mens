import Product from '../../Domain/Entities/Product';
import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
import UpdateProductInputData from '../Dtos/UpdateProductInputData';

export default class UpdateProductAction {
  async execute(
    input: UpdateProductInputData,
    currentValue: Product,
  ): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product(
      input.part_number ?? currentValue.getPartNumber(),
      input.name ?? currentValue.getName(),
      input.description ?? currentValue.getDescription(),
      input.price ?? currentValue.getPrice(),
      input.quantity ?? currentValue.getQuantity(),
      input.category ?? currentValue.getCategory(),
      input.brand ?? currentValue.getBrand(),
      input.supplier ?? currentValue.getSupplier(),
      input.purchase_price ?? currentValue.getPurchasePrice(),
      input.size ?? currentValue.getSize(),
      input.color ?? currentValue.getColor(),
      currentValue.getId(),
    );
    return await productRepository.save(product);
  }
}
