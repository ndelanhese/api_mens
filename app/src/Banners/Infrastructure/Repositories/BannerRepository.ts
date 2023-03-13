import Banner from '../../Domain/Entities/Banner';
import BannersModel from '../Models/BannersModel';

export default class BannerRepository {
  private bannersModel: BannersModel;

  constructor() {
    this.bannersModel = new BannersModel();
  }

  async save(banner: Banner): Promise<Banner> {
    if (banner.getId()) {
      return this.update(banner);
    }
    return this.create(banner);
  }

  async create(banner: Banner): Promise<Banner> {
    const { id } = await this.bannersModel.createBanner(banner);
    return banner.setId(id);
  }

  async delete(bannerId: number): Promise<void> {
    await this.bannersModel.deleteBanner(bannerId);
  }

  async update(banner: Banner): Promise<Banner> {
    await this.bannersModel.updateBanner(banner);
    return banner;
  }

  async updateStatus(bannerId: number, status: string): Promise<void> {
    await this.bannersModel.updateBannerStatus(bannerId, status);
  }

  async updateOrder(bannerId: number, order: number): Promise<void> {
    await this.bannersModel.updateBannerOrder(bannerId, order);
  }

  async getOrderByArea(area: string): Promise<number> {
    const order = await this.bannersModel.getLastOrderByArea(area);
    if (!order) return 1;
    return order + 1;
  }
}
