import { Op } from 'sequelize';
import HttpError from '@exceptions/HttpError';
import bannersModel from '@db-models/BannersModel';
import {
  IBannerModelResponse,
  IBannerModelResponseWithMedia,
  IBannersAreaResponse,
  IBannersModelResponse,
  IBannersParams,
} from './BannersModel.types';
import MediaModel from '@db-models//MediasModel';

export default class BannersModels {
  public async findAll({
    area,
    search,
    status,
  }: IBannersParams): Promise<IBannersModelResponse | []> {
    try {
      const banners = await bannersModel.findAll({
        order: [['order', 'asc']],
        where: {
          area: {
            [Op.eq]: area,
          },
          status: {
            [Op.iLike]: status,
          },
          [Op.or]: {
            title: {
              [Op.iLike]: `%${search}%`,
            },
            url: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
        include: [
          {
            model: MediaModel,
            as: 'desktop_image',
            attributes: ['id', 'url'],
          },
          {
            model: MediaModel,
            as: 'mobile_image',
            attributes: ['id', 'url'],
          },
        ],
      });
      if (banners.length > 0) {
        return {
          data: banners,
        };
      }
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getBanner(id: number): Promise<IBannerModelResponse> {
    try {
      const banner: any = await bannersModel.findByPk(id, {
        include: [
          {
            model: MediaModel,
            as: 'desktop_image',
            attributes: ['id', 'url'],
          },
          {
            model: MediaModel,
            as: 'mobile_image',
            attributes: ['id', 'url'],
          },
        ],
      });
      return banner;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getBannerWithMedia(
    id: number,
  ): Promise<IBannerModelResponseWithMedia> {
    try {
      const banner: any = await bannersModel.findByPk(id, {
        include: [
          {
            model: MediaModel,
            as: 'desktop_image',
          },
          {
            model: MediaModel,
            as: 'mobile_image',
          },
        ],
      });
      return banner;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getBannersArea(): Promise<IBannersAreaResponse[] | []> {
    try {
      const areas = await bannersModel.findAll({
        attributes: ['area'],
        group: ['area'],
      });
      if (areas) return areas;
      return [];
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
