import adminAuthToken from '@auth-middleware/AuthMiddleware';
import myScanSourceAuthToken from '@my-scan-source/Shared/MIddleware/AuthMiddleware';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import cors from 'cors';
import AdminBannersRoute from '@admin/Banners/Routes/BannersRoute';
import AdminProductsRoute from '@admin/Products/Routes/ProductsRoute';
import AdminUsersRoute from '@admin/Users/Routes/UsersRoute';
import AdminPermissionsRoute from '@admin/Permissions/Routes/PermissionsRoute';
import AdminLoginRoute from '@admin/Login/Routes/LoginRoute';
import AdminCurrenciesRoute from '@admin/Extras/Currencies/Routes/CurrenciesRoute';
import AdminRolesRoute from '@admin/Roles/Routes/RolesRoute';
import AdminProfileRoute from '@admin/Profile/Routes/ProfileRoutes';
import AdminEstimatesRoute from '@admin/Estimates/Routes/EstimatesRoute';
import MyScanSourceBannersRoute from '@my-scan-source/Banners/Routes/BannersRoute';
import MyScanSourceLoginRoute from '@my-scan-source/Login/Routes/LoginRoute';
import MyScanSourceUserRoute from '@my-scan-source/User/Routes/UserRoute';
import MyScanSourceProductsRoute from '@my-scan-source/Products/Routes/ProductsRoute';
import MyScanSourceEstimatesRoute from '@my-scan-source/Estimates/Routes/EstimatesRoute';
import MyScanSourceConfiguratorPabxRoute from '@app/api/MyScanSource/Configurators/PabxCloud/Routes/PabxCloud';
import MyScanSourceCoLocationConfiguratorRoute from '@app/api/MyScanSource/Configurators/CoLocation/Routes/CoLocation';
import MyScanSourceCyberpassConfiguratorRoute from '@app/api/MyScanSource/Configurators/Cyberpass/Routes/Cyberpass';

export default class App {
  private app: Express;
  private adminLoginRoute: AdminLoginRoute;
  private adminBannersRoute: AdminBannersRoute;
  private adminProductsRoute: AdminProductsRoute;
  private adminUsersRoute: AdminUsersRoute;
  private adminPermissionsRoute: AdminPermissionsRoute;
  private adminCurrenciesRoute: AdminCurrenciesRoute;
  private adminRolesRoute: AdminRolesRoute;
  private adminProfileRoute: AdminProfileRoute;
  private adminEstimatesRoute: AdminEstimatesRoute;

  private myScanSourceBannersRoute: MyScanSourceBannersRoute;
  private myScanSourceLoginRoute: MyScanSourceLoginRoute;
  private myScanSourceUserRoute: MyScanSourceUserRoute;
  private myScanSourceProductsRoute: MyScanSourceProductsRoute;
  private myScanSourceEstimatesRoute: MyScanSourceEstimatesRoute;
  private myScanSourceConfiguratorPabxRoute: MyScanSourceConfiguratorPabxRoute;
  private myScanSourceConfiguratorCoLocationRoute: MyScanSourceCoLocationConfiguratorRoute;
  private myScanSourceConfiguratorCyberpassRoute: MyScanSourceCyberpassConfiguratorRoute;

  constructor() {
    this.app = express();
    this.adminLoginRoute = new AdminLoginRoute();
    this.adminBannersRoute = new AdminBannersRoute();
    this.adminProductsRoute = new AdminProductsRoute();
    this.adminUsersRoute = new AdminUsersRoute();
    this.adminPermissionsRoute = new AdminPermissionsRoute();
    this.adminCurrenciesRoute = new AdminCurrenciesRoute();
    this.adminRolesRoute = new AdminRolesRoute();
    this.adminProfileRoute = new AdminProfileRoute();
    this.adminEstimatesRoute = new AdminEstimatesRoute();

    this.myScanSourceBannersRoute = new MyScanSourceBannersRoute();
    this.myScanSourceLoginRoute = new MyScanSourceLoginRoute();
    this.myScanSourceUserRoute = new MyScanSourceUserRoute();
    this.myScanSourceProductsRoute = new MyScanSourceProductsRoute();
    this.myScanSourceEstimatesRoute = new MyScanSourceEstimatesRoute();
    this.myScanSourceConfiguratorPabxRoute =
      new MyScanSourceConfiguratorPabxRoute();
    this.myScanSourceConfiguratorCoLocationRoute =
      new MyScanSourceCoLocationConfiguratorRoute();
    this.myScanSourceConfiguratorCyberpassRoute =
      new MyScanSourceCyberpassConfiguratorRoute();

    this.setup();
    Sentry.init(sentryConfig);
  }

  private setup(): void {
    this.app.use(cors());
    this.app.use(
      fileUpload({
        tempFileDir: '/tmp/',
        safeFileNames: /\\/g,
        preserveExtension: 4,
        limits: { fileSize: 50 * 1024 * 1024 },
        abortOnLimit: true,
      }),
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(Sentry.Handlers.requestHandler());

    this.app.use('/admin/login', this.adminLoginRoute.loginRoute);
    this.app.use(
      '/admin/banners',
      adminAuthToken,
      this.adminBannersRoute.bannerRoute,
    );
    this.app.use(
      '/admin/products',
      adminAuthToken,
      this.adminProductsRoute.productRoute,
    );
    this.app.use(
      '/admin/users',
      adminAuthToken,
      this.adminUsersRoute.userRoute,
    );
    this.app.use(
      '/admin/permissions',
      adminAuthToken,
      this.adminPermissionsRoute.permissionRoute,
    );
    this.app.use(
      '/admin/extras/currencies',
      adminAuthToken,
      this.adminCurrenciesRoute.currencyRoute,
    );
    this.app.use(
      '/admin/roles',
      adminAuthToken,
      this.adminRolesRoute.roleRoute,
    );
    this.app.use(
      '/admin/profile',
      adminAuthToken,
      this.adminProfileRoute.profileRoute,
    );
    this.app.use(
      '/admin/estimates',
      adminAuthToken,
      this.adminEstimatesRoute.estimateRoute,
    );

    this.app.use(
      '/my-scansource/banners',
      myScanSourceAuthToken,
      this.myScanSourceBannersRoute.bannerRoute,
    );
    this.app.use(
      '/my-scansource/login',
      this.myScanSourceLoginRoute.loginRoute,
    );
    this.app.use(
      '/my-scansource/user',
      myScanSourceAuthToken,
      this.myScanSourceUserRoute.userRoute,
    );
    this.app.use(
      '/my-scansource/products',
      myScanSourceAuthToken,
      this.myScanSourceProductsRoute.productRoute,
    );
    this.app.use(
      '/my-scansource/estimates',
      myScanSourceAuthToken,
      this.myScanSourceEstimatesRoute.estimateRoute,
    );
    this.app.use(
      '/my-scansource/configurator/pabx-cloud',
      myScanSourceAuthToken,
      this.myScanSourceConfiguratorPabxRoute.pabxCloudController,
    );
    this.app.use(
      '/my-scansource/configurator/co-location',
      myScanSourceAuthToken,
      this.myScanSourceConfiguratorCoLocationRoute.coLocationsRoute,
    );
    this.app.use(
      '/my-scansource/configurator/cyberpass',
      myScanSourceAuthToken,
      this.myScanSourceConfiguratorCyberpassRoute.MyCyberpassRoute,
    );

    // Test route
    this.app.post('/ping', (req, res) => {
      return res.status(200).json('pong');
    });

    this.app.use(Sentry.Handlers.errorHandler());
  }

  public start(PORT: number): void {
    this.app.listen(PORT);
  }
}
