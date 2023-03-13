import HttpError from '@exceptions/HttpError';
import Banner from '../../Domain/Entities/Banner';
import BannerRepository from '../../Infrastructure/Repositories/BannerRepository';
import CreateBannerInputData from '../Dtos/CreateBannerInputData';
import MediasService from '@app/src/Extras/Domain/Services/MediasService';
import fileUpload from 'express-fileupload';

export default class CreateBannerAction {
  async execute(input: CreateBannerInputData): Promise<Banner> {
    const desktopImage = await this.createMedia(input.desktop_image);
    const mobileImage = await this.createMedia(input.mobile_image);
    const bannerRepository = new BannerRepository();
    const order = await bannerRepository.getOrderByArea(input.area);
    const banner = new Banner(
      order,
      input.title,
      input.area,
      desktopImage,
      mobileImage,
      input.url,
      input.start_date,
      input.end_date,
      input.status,
    );
    return await bannerRepository.save(banner);
  }

  private async createMedia(mediaFile: fileUpload.UploadedFile) {
    const mediaService = new MediasService();
    const media = await mediaService.createMedia(mediaFile);
    if (media) return media;
    throw new HttpError(500, 'Erro ao criar media.');
  }
}
