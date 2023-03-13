import { Op } from 'sequelize';
import HttpError from '@exceptions/HttpError';
import bannersModel from '@db-models/BannersModel';
import { IBannersModelResponse } from './BannersModel.types';
import getDate from '@shared/Date';
import MediaModel from '@db-models/MediasModel';

export default class BannersModels {
  public async getBanners(area: string): Promise<IBannersModelResponse | []> {
    const currentDate = getDate();
    try {
      const banners = await bannersModel.findAll({
        order: [['order', 'asc']],
        where: {
          area: {
            [Op.eq]: area,
          },
          status: {
            [Op.like]: 'published',
          },
          start_date: { [Op.lte]: currentDate },
          end_date: { [Op.gte]: currentDate },
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
}
