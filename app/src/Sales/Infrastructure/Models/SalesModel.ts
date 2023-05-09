// import productModel from '@db-models/SalesModel';
// import HttpError from '@exceptions/HttpError';

// import Sale from '../../Domain/Entities/Sale';

// export default class SalesModel {
//   public async createSale(payload: Sale) {
//     try {
//       const categoryId = payload.getCategory()?.getId() ?? 1;
//       const brandId = payload.getBrand()?.getId() ?? 1;
//       const supplierId = payload.getSupplier()?.getId() ?? 1;
//       return await productModel.create({
//         date: payload.getDate(),
//         name: payload.getName(),
//         description: payload.getDescription(),
//         purchase_price: payload.getPurchasePrice(),
//         price: payload.getPrice(),
//         size: payload.getSize(),
//         color: payload.getColor(),
//         quantity: payload.getQuantity(),
//         category_id: categoryId,
//         brand_id: brandId,
//         supplier_id: supplierId,
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao criar produto.', error);
//     }
//   }

//   public async updateSale(payload: Sale): Promise<void> {
//     try {
//       const categoryId = payload.getCategory()?.getId();
//       const brandId = payload.getBrand()?.getId();
//       const supplierId = payload.getSupplier()?.getId();
//       await productModel.update(
//         {
//           part_number: payload.getPartNumber(),
//           name: payload.getName(),
//           description: payload.getDescription(),
//           purchase_price: payload.getPurchasePrice(),
//           price: payload.getPrice(),
//           size: payload.getSize(),
//           color: payload.getColor(),
//           quantity: payload.getQuantity(),
//           category_id: categoryId,
//           brand_id: brandId,
//           supplier_id: supplierId,
//         },
//         {
//           where: {
//             id: payload.getId(),
//           },
//         },
//       );
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao atualizar o produto.', error);
//     }
//   }

//   public async updateSaleStock(id: number, quantity: number) {
//     try {
//       await productModel.update(
//         {
//           quantity,
//         },
//         {
//           where: {
//             id,
//           },
//         },
//       );
//     } catch (error) {
//       throw new HttpError(
//         500,
//         'Erro ao atualizar o estoque do produto.',
//         error,
//       );
//     }
//   }

//   public async deleteSale(id: number): Promise<void> {
//     try {
//       await productModel.destroy({
//         where: {
//           id,
//         },
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao deletar o produto.', error);
//     }
//   }

//   public async exportSales(): Promise<ISaleModel[]> {
//     try {
//       return await productModel.findAll({
//         order: [['id', 'DESC']],
//       });
//     } catch (error) {
//       throw new HttpError(500, 'Erro ao exportar os produtos.', error);
//     }
//   }
// }
