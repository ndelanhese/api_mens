import Sale from '../../Domain/Entities/Sale';
import { statusEnum } from '../../Domain/Enums/Status';
import SalesModel from '../Models/SalesModel';

export default class SalesRepository {
  private salesModel: SalesModel;

  constructor() {
    this.salesModel = new SalesModel();
  }

  async save(sale: Sale): Promise<Sale> {
    if (sale.getId()) {
      return this.update(sale);
    }
    return this.create(sale);
  }

  async create(sale: Sale): Promise<Sale> {
    const { id } = await this.salesModel.createSale(sale);
    return sale.setId(id);
  }

  async delete(saleId: number): Promise<void> {
    await this.salesModel.deleteSale(saleId);
  }

  async update(sale: Sale): Promise<Sale> {
    await this.salesModel.updateSale(sale);
    return sale;
  }

  async updateStatus(id: number, status: statusEnum) {
    await this.salesModel.updateSaleStatus(id, status);
  }

  async export() {
    // const sales = await this.salesModel.exportSales();
    // return Promise.all(
    //   sales.map(async sale => {
    //     const category = await this.getCategory(sale.category_id);
    //     const brand = await this.getBrand(sale.brand_id);
    //     const supplier = await this.getSupplier(sale.supplier_id);
    //     return new Sales(
    //       sale.name,
    //       sale.description,
    //       sale.price,
    //       sale.quantity,
    //       sale.part_number,
    //       category,
    //       brand,
    //       supplier,
    //       sale.purchase_price,
    //       sale.size,
    //       sale.color,
    //     );
    //   }),
    // );
  }
}
