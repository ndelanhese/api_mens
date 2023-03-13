import MediasService from '@app/src/Extras/Domain/Services/MediasService';
import BannerRepository from '../../Infrastructure/Repositories/BannerRepository';
import DeleteBannerInputData from '../Dtos/DeleteBannerInputData';

export default class DeleteBannerAction {
  async execute(input: DeleteBannerInputData): Promise<void> {
    const { id: desktop_image_id } = input.desktop_image;
    const { id: mobile_image_id } = input.mobile_image;
    const bannerRepository = new BannerRepository();
    await bannerRepository.delete(input.id);
    await this.deleteMedias(desktop_image_id, mobile_image_id);
  }

  private async deleteMedias(
    desktopImageId: number,
    mobileImageId: number,
  ): Promise<void> {
    const mediaService = new MediasService();
    await mediaService.deleteMedia(desktopImageId);
    await mediaService.deleteMedia(mobileImageId);
  }
}
