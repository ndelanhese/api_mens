import { Op } from 'sequelize';
import bannersModel from '@db-models/BannersModel';
import HttpError from '@exceptions/HttpError';
import { IBannerModel } from './BannerModel.types';
import Banner from '../../Domain/Entities/Banner';

export default class BannersModel {
  public async deleteBanner(id: number) {
    try {
      const deleted = await bannersModel.destroy({
        where: {
          id,
        },
      });
      return deleted;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async createBanner(payload: Banner): Promise<IBannerModel> {
    try {
      const banner = await bannersModel.create({
        order: payload.getOrder(),
        title: payload.getTitle(),
        area: payload.getArea(),
        ...(payload.getUrl() ? { url: payload.getUrl() } : null),
        ...(payload.getStartDate()
          ? { start_date: payload.getStartDate() }
          : null),
        ...(payload.getEndDate() ? { end_date: payload.getEndDate() } : null),
        status: payload.getStatus(),

        ...(payload.getDesktopImage().getId()
          ? { desktop_image_id: payload.getDesktopImage().getId() }
          : null),
        ...(payload.getMobileImage().getId()
          ? { mobile_image_id: payload.getMobileImage().getId() }
          : null),
      });
      return banner;
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar banner.');
    }
  }

  public async updateBanner(payload: Banner): Promise<void> {
    try {
      const banner = await bannersModel.update(
        {
          order: payload.getOrder(),
          title: payload.getTitle(),
          area: payload.getArea(),
          url: payload.getUrl(),
          start_date: payload.getStartDate(),
          end_date: payload.getEndDate(),
          status: payload.getStatus(),
          desktop_image_id: payload.getDesktopImage().getId(),
          mobile_image_id: payload.getMobileImage().getId(),
        },
        { where: { id: payload.getId() } },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getLastOrderByArea(area: string): Promise<number | undefined> {
    try {
      const data = await bannersModel.findOne({
        attributes: ['order'],
        order: [['order', 'DESC']],
        where: {
          area: {
            [Op.eq]: area,
          },
        },
      });
      return data?.order;
    } catch (error) {
      console.error(error);
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async updateBannerOrder(id: number, order: number): Promise<number[]> {
    try {
      const updated = await bannersModel.update({ order }, { where: { id } });
      return updated;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async updateBannerStatus(id: number, status: string): Promise<void> {
    try {
      const updated = await bannersModel.update(
        { status },
        {
          where: {
            id,
          },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
