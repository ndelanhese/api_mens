// import productModel from '@db-models/ProductsModel';
// import HttpError from '@exceptions/HttpError';
// import { Op } from 'sequelize';

// import Product from '../../Domain/Entities/Product';

// import { IProductModel, IProductPayload } from './ProductModel.types';

// export default class ProductsModel {
//   public async createProduct(payload: Product): Promise<IProductModel> {
//     try {
//       return await productModel.create({
//         manufacturer_slug: payload.getManufacturerSlug(),
//         type: payload.getType(),
//         part_number: payload.getPartNumber(),
//         description: payload.getDescription(),
//         currency: payload.getCurrency(),
//         contributor_price: payload.getContributorPrice(),
//         exempt_price: payload.getExemptPrice(),
//         outlet: payload.isOutlet(),
//         observation: payload.getObservation(),
//         disclaimer: payload.getDisclaimer(),
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao criar produto.');
//     }
//   }

//   public async updateProduct(payload: Product): Promise<void> {
//     try {
//       await productModel.update(
//         {
//           manufacturer_slug: payload.getManufacturerSlug(),
//           type: payload.getType(),
//           part_number: payload.getPartNumber(),
//           description: payload.getDescription(),
//           currency: payload.getCurrency(),
//           contributor_price: payload.getContributorPrice(),
//           exempt_price: payload.getExemptPrice(),
//           outlet: payload.isOutlet(),
//           observation: payload.getObservation(),
//           disclaimer: payload.getDisclaimer(),
//         },
//         {
//           where: {
//             id: payload.getId(),
//           },
//         },
//       );
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao atualizar o produto.');
//     }
//   }

//   public async deleteProduct(productId: number): Promise<void> {
//     try {
//       await productModel.destroy({
//         where: {
//           id: productId,
//         },
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao deletar o produto.');
//     }
//   }

//   public async importProducts(
//     products: IProductPayload[],
//     manufacturer_slug: string,
//   ): Promise<void> {
//     try {
//       await this.deleteProductsByManufacturer(manufacturer_slug);
//       await productModel.bulkCreate(products);
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao importar os produtos.');
//     }
//   }

//   public async exportProducts(
//     manufacturer_slug: string,
//   ): Promise<IProductModel[]> {
//     try {
//       return await productModel.findAll({
//         order: [['id', 'ASC']],
//         where: {
//           manufacturer_slug: {
//             [Op.eq]: manufacturer_slug,
//           },
//         },
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao exportar os produtos.');
//     }
//   }

//   private async deleteProductsByManufacturer(manufacturer_slug: string) {
//     try {
//       await productModel.destroy({
//         where: {
//           manufacturer_slug,
//         },
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao deletar os produtos.');
//     }
//   }
// }
