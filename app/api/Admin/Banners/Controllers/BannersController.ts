import { Request, Response } from 'express';
import HttpError from '@exceptions/HttpError';
import BannersModels from '../Models/BannersModel';
import { IBannersParams } from './BannersController.types';
import BaseController from '@admin-base-controller/BaseController';
import CreateBannerAction from '@app/src/Banners/Application/Actions/CreateBannerAction';
import DeleteBannerAction from '@app/src/Banners/Application/Actions/DeleteBannerAction';
import UpdateBannerAction from '@app/src/Banners/Application/Actions/UpdateBannerAction';
import UpdateBannerFactory from '../Factories/UpdateBannerFactory';
import UpdateBannerStatusAction from '@app/src/Banners/Application/Actions/UpdateBannerStatusAction';
import CreateBannerFactory from '../Factories/CreateBannerFactory';
import updateBannersOrderFactory from '../Factories/UpdateBannerOrderFactory';
import UpdateBannerOrderAction from '@app/src/Banners/Application/Actions/UpdateBannerOrderAction';
import UpdateBannerStatusFactory from '../Factories/UpdateBannerStatusFactory';
import DeleteBannerFactory from '../Factories/DeleteBannerFactory';
import { nameLabel } from '@app/src/Shared/Domain/Utils/String';

export default class BannersController extends BaseController {
  private bannersModel: BannersModels;

  constructor() {
    super();
    this.bannersModel = new BannersModels();
  }

  public async getBanners(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_read');
      const { area } = req.query;
      const { search } = req.query;
      const { status } = req.query;
      const cache = await this.getCache(
        `admin-banners-${area}-${search}-${status}`,
      );
      if (cache) {
        return res.status(200).json(cache);
      }
      const bannersParams: IBannersParams = {
        ...(area === '' || !area
          ? { area: 'slide-products' }
          : { area: String(area) }),
        ...(search === '' || !search
          ? { search: '' }
          : { search: String(search) }),
        ...(status === '' || !status
          ? { status: '%%' }
          : { status: String(status) }),
      };
      const banners = await this.bannersModel.findAll(bannersParams);
      await this.createCache(
        `admin-banners-${area}-${search}-${status}`,
        banners,
      );
      return res.status(200).json(banners);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getBanner(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_read');
      const { id } = req.params;
      const cache = await this.getCache(`admin-banners-${id}`);
      if (cache) {
        return res.status(200).json(cache);
      }
      const banner = await this.bannersModel.getBanner(Number(id));
      if (!banner) throw new HttpError(404, 'Banner não encontrado.');
      await this.createCache(`admin-banners-${id}`, banner);
      return res.status(200).json(banner);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async getBannersArea(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_read');
      const cache = await this.getCache('admin-banners-areas');
      if (cache) {
        return res.status(200).json(cache);
      }
      const areas = await this.bannersModel.getBannersArea();
      const response = areas.map((area) => ({
        slug: area.area,
        label: nameLabel(area.area),
      }));
      await this.createCache('admin-banners-areas', {
        data: response,
      });
      return res.status(200).json({
        data: response,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async createBanner(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_create');
      const bannerInputData = CreateBannerFactory.fromRequest(req);
      const bannerAction = new CreateBannerAction();
      const bannerId = (await bannerAction.execute(bannerInputData)).getId();
      await this.deleteCache('banners');
      return res.status(200).json(bannerId);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async deleteBanner(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_delete');
      const { id } = req.params;
      const banner = await this.bannersModel.getBanner(Number(id));
      if (!banner) {
        throw new HttpError(404, 'Banner não encontrado.');
      }
      const bannerInputData = DeleteBannerFactory.fromRequest(banner);
      const bannerAction = new DeleteBannerAction();
      await bannerAction.execute(bannerInputData);
      await this.deleteCache('banners');
      return res.status(200).json('Banner deletado com sucesso!');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateBanner(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_update');
      const { id } = req.params;
      const banner = await this.bannersModel.getBannerWithMedia(Number(id));
      if (!banner) {
        throw new HttpError(404, 'Banner não encontrado.');
      }
      const bannerInputData = UpdateBannerFactory.fromRequest(req);
      const currentValueInputData =
        UpdateBannerFactory.currentBannerFactory(banner);
      const bannerAction = new UpdateBannerAction();
      await bannerAction.execute(bannerInputData, currentValueInputData);
      await this.deleteCache('banners');
      return res.status(200).json('Banner atualizado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateBannerStatus(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_update');
      const bannerStatusInputData = UpdateBannerStatusFactory.fromRequest(req);
      const bannerAction = new UpdateBannerStatusAction();
      await bannerAction.execute(bannerStatusInputData);
      await this.deleteCache('banners');
      return res.status(200).json('Banner atualizado com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  public async updateBannerOrder(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      await this.verifyPermission(req, 'banners_reorder');
      const bannerStatusInputData = updateBannersOrderFactory.fromRequest(req);
      const bannerAction = new UpdateBannerOrderAction();
      await bannerAction.execute(bannerStatusInputData);
      await this.deleteCache('banners');
      return res.status(200).json('Banners reordenados com sucesso.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
