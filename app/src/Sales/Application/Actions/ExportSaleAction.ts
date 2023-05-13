import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';

export default class ExportSaleAction {
  async execute() {
    const saleRepository = new SalesRepository();
    return await saleRepository.export();
  }
}
