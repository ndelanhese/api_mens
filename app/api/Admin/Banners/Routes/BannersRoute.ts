import express, { Router } from 'express';
import BannersController from '../Controllers/BannersController';
import createBannerMiddleware from '../MIddleware/CreateBannerMiddleware';
import deleteBannerMiddleware from '../MIddleware/DeleteBannerMiddleware';
import updateBannerMiddleware from '../MIddleware/UpdateBannerMiddleware';
import updateBannerStatusMiddleware from '../MIddleware/UpdateBannerStatusMiddleware';
import updateBannersOrderMiddleware from '../MIddleware/UpdateBannersOrderMiddleware';

export default class BannersRoute {
  private bannersRoute: Router;

  private bannersController: BannersController;

  constructor() {
    this.bannersRoute = express.Router();
    this.bannersController = new BannersController();

    this.setup();
  }

  private setup(): void {
    const index = this.bannersController.getBanners.bind(
      this.bannersController,
    );
    const getBannerByPk = this.bannersController.getBanner.bind(
      this.bannersController,
    );
    const getBannersArea = this.bannersController.getBannersArea.bind(
      this.bannersController,
    );
    const createBanner = this.bannersController.createBanner.bind(
      this.bannersController,
    );
    const deleteBanner = this.bannersController.deleteBanner.bind(
      this.bannersController,
    );
    const updateBanner = this.bannersController.updateBanner.bind(
      this.bannersController,
    );
    const updateBannerStatus = this.bannersController.updateBannerStatus.bind(
      this.bannersController,
    );
    const updateBannersOrder = this.bannersController.updateBannerOrder.bind(
      this.bannersController,
    );
    this.bannersRoute.get('/', index);
    this.bannersRoute.get('/show/:id', getBannerByPk);
    this.bannersRoute.get('/areas', getBannersArea);
    this.bannersRoute.post('/create', createBannerMiddleware, createBanner);
    this.bannersRoute.delete('/:id', deleteBannerMiddleware, deleteBanner);
    this.bannersRoute.post('/update/:id', updateBannerMiddleware, updateBanner);
    this.bannersRoute.put(
      '/:id',
      updateBannerStatusMiddleware,
      updateBannerStatus,
    );
    this.bannersRoute.post(
      '/reorder',
      updateBannersOrderMiddleware,
      updateBannersOrder,
    );
  }

  get bannerRoute() {
    return this.bannersRoute;
  }
}
