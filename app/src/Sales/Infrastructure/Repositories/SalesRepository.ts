import Sale from '../../Domain/Entities/Sale';
import { StatusTypesOptions } from '../../Domain/Enums/StatusTypes.types';
import SalesModel from '../Models/SalesModel';

import { ISaleFilter } from './SalesRepository.types';

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

  async update(sale: Sale): Promise<Sale> {
    await this.salesModel.updateSale(sale);
    return sale;
  }

  async updateStatus(
    id: number,
    status: StatusTypesOptions,
    observation: string,
  ) {
    await this.salesModel.updateSaleStatus(id, status, observation);
  }

  async export(input: ISaleFilter) {
    return await this.salesModel.exportSales(input);
  }

  async getSale(id: number) {
    return await this.salesModel.getSale(id);
  }
}
