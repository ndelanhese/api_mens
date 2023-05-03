// import Product from '../../Domain/Entities/Product';
// import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
// import UpdateProductInputData from '../Dtos/UpdateProductInputData';

// export default class UpdateProductAction {
//   async execute(
//     input: UpdateProductInputData,
//     currentValue: Product,
//   ): Promise<Product> {
//     const productRepository = new ProductRepository();
//     const product = new Product(
//       input.manufacturer_slug ?? currentValue.getManufacturerSlug(),
//       input.type ?? currentValue.getType(),
//       input.part_number ?? currentValue.getPartNumber(),
//       input.description ?? currentValue.getDescription(),
//       input.currency ?? currentValue.getCurrency(),
//       input.outlet ?? currentValue.isOutlet(),
//       input.contributor_price === undefined
//         ? currentValue.getContributorPrice()
//         : input.contributor_price,
//       input.exempt_price === undefined
//         ? currentValue.getExemptPrice()
//         : input.exempt_price,
//       input.observation ?? currentValue.getObservation(),
//       input.disclaimer ?? currentValue.getDisclaimer(),
//       currentValue.getId(),
//     );
//     return await productRepository.save(product);
//   }
// }
