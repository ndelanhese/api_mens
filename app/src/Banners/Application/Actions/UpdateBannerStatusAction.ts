import BannerRepository from '../../Infrastructure/Repositories/BannerRepository';
import UpdateBannerStatusInputData from '../Dtos/UpdateStatusBannerInputData';

export default class UpdateBannerStatusAction {
  async execute(input: UpdateBannerStatusInputData): Promise<void> {
    const bannerRepository = new BannerRepository();
    await bannerRepository.updateStatus(input.bannerId, input.status);
  }
}
