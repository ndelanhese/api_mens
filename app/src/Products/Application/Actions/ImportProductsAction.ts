// import Product from '../../Domain/Entities/Product';
// import SheetService from '../../Domain/Services/SheetService';
// import ProductRepository from '../../Infrastructure/Repositories/ProductRepository';
// import ImportProductsInputData from '../Dtos/ImportProductsInputData';

// import { IImportProducts } from './ImportProductsAction.types';

// export default class ImportProductsAction {
//   async execute(input: ImportProductsInputData): Promise<IImportProducts> {
//     const dataFromSheet = this.convertXlsx(
//       input.table,
//       input.manufacturer_slug,
//     );
//     const productsData = dataFromSheet.products.map(
//       product =>
//         new Product(
//           product.manufacturer_slug,
//           product.type,
//           product.part_number,
//           product.description,
//           product.currency,
//           product.outlet,
//           product.contributor_price,
//           product.exempt_price,
//           product.observation,
//           product.disclaimer,
//         ),
//     );
//     const productRepository = new ProductRepository();
//     const products = productsData.map(product => ({
//       manufacturer_slug: product.getManufacturerSlug(),
//       type: product.getType(),
//       part_number: product.getPartNumber(),
//       description: product.getDescription(),
//       currency: product.getCurrency(),
//       contributor_price: product.getContributorPrice(),
//       exempt_price: product.getExemptPrice(),
//       outlet: product.isOutlet(),
//       observation: product.getObservation(),
//       disclaimer: product.getDisclaimer(),
//     }));
//     await productRepository.import(products, input.manufacturer_slug);
//     const { errors } = dataFromSheet;
//     return {
//       ...(errors.length === 0 ? { errors: null } : { errors: errors }),
//       successfulRows: dataFromSheet.products.length,
//     };
//   }

//   private convertXlsx(sheet: Buffer, manufacturer_slug: string) {
//     const sheetService = new SheetService();
//     return sheetService.sheetToData(sheet, manufacturer_slug);
//   }
// }
