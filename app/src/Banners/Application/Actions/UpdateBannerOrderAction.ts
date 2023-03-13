import BannerRepository from '../../Infrastructure/Repositories/BannerRepository';
import UpdateBannerOrderInputData from '../Dtos/UpdateBannerOrderInputData';

export default class UpdateBannerOrderAction {
  async execute(input: UpdateBannerOrderInputData): Promise<void> {
    const bannerRepository = new BannerRepository();
    input.banners.map(async (order) => {
      await bannerRepository.updateOrder(order.id, order.order);
    });
  }
}
