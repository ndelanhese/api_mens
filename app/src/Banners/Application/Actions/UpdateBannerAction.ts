import HttpError from '@exceptions/HttpError';
import Banner from '../../Domain/Entities/Banner';
import BannerRepository from '../../Infrastructure/Repositories/BannerRepository';
import MediasService from '@app/src/Extras/Domain/Services/MediasService';
import fileUpload from 'express-fileupload';
import UpdateBannerInputData from '../Dtos/UpdateBannerInputData';
import Media from '@app/src/Extras/Domain/Entities/Media';

export default class UpdateBannerAction {
  async execute(
    input: UpdateBannerInputData,
    currentValues: Banner,
  ): Promise<void> {
    const desktopImage = input.desktop_image
      ? await this.createMedia(input.desktop_image)
      : currentValues.getDesktopImage();
    const mobileImage = input.mobile_image
      ? await this.createMedia(input.mobile_image)
      : currentValues.getMobileImage();
    const bannerRepository = new BannerRepository();
    const banner = new Banner(
      input.order ? input.order : currentValues.getOrder(),
      input.title ? input.title : currentValues.getTitle(),
      input.area ? input.area : currentValues.getArea(),
      desktopImage,
      mobileImage,
      input.url ? input.url : currentValues.getUrl(),
      input.start_date ? input.start_date : currentValues.getStartDate(),
      input.end_date ? input.end_date : currentValues.getEndDate(),
      input.status ? input.status : currentValues.getStatus(),
      currentValues.getId(),
    );
    await bannerRepository.save(banner);
    if (input.desktop_image)
      await this.deleteMedia(currentValues.getDesktopImage().getId() || 1);
    if (input.mobile_image)
      await this.deleteMedia(currentValues.getMobileImage().getId() || 1);
  }

  private async createMedia(
    mediaFile: fileUpload.UploadedFile,
  ): Promise<Media> {
    const mediaService = new MediasService();
    const media = await mediaService.createMedia(mediaFile);
    if (media) return media;
    throw new HttpError(500, 'Erro ao criar media.');
  }

  private async deleteMedia(mediaId: number): Promise<void> {
    const mediaService = new MediasService();
    await mediaService.deleteMedia(mediaId);
  }
}
