import Brand from '../../Domain/Entities/Brand';
import BrandsModel from '../Models/BrandsModel';

export default class BrandsRepository {
  private brandsModel: BrandsModel;

  constructor() {
    this.brandsModel = new BrandsModel();
  }

  async save(brand: Brand): Promise<Brand> {
    if (brand.getId()) {
      this.update(brand);
    }
    return this.create(brand);
  }

  async create(brand: Brand): Promise<Brand> {
    const { id } = await this.brandsModel.createBrand(brand);
    return brand.setId(id);
  }

  async delete(brandId: number): Promise<void> {
    await this.brandsModel.deleteBrand(brandId);
  }

  async update(brand: Brand): Promise<void> {
    await this.brandsModel.updateBrand(brand);
  }
}
