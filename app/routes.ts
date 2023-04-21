import AclRoute from '@app/api/Acl/Routes/AclRoute';
import LoginRoute from '@app/api/Auth/Routes/AuthRoute';
import BrandsRoute from '@app/api/Brands/Routes/BrandsRoute';
import CitiesRoute from '@app/api/Extra/Routes/CitiesRoute';
import StatesRoute from '@app/api/Extra/Routes/StatesRoute';
import UsersRoute from '@app/api/Users/Routes/UsersRoute';
import AuthToken from '@auth-middleware/AuthMiddleware';
import { Router, Request, Response } from 'express';

const router = Router();

const prepareInstance = () => {
  const loginRoute = new LoginRoute();
  const aclRoute = new AclRoute();
  const usersRoute = new UsersRoute();
  const statesRoute = new StatesRoute();
  const citiesRoute = new CitiesRoute();
  const brandsRoute = new BrandsRoute();

  return {
    loginRoute,
    aclRoute,
    usersRoute,
    statesRoute,
    citiesRoute,
    brandsRoute,
  };
};
const instances = prepareInstance();
router.post('/ping', (req: Request, res: Response) => {
  return res.status(200).json('pong');
});
router.use('/auth', instances.loginRoute.authRoute);
router.use('/acl', AuthToken, instances.aclRoute.aclRoutes);
router.use('/users', AuthToken, instances.usersRoute.userRoute);
router.use('/states', AuthToken, instances.statesRoute.stateRoute);
router.use('/cities', AuthToken, instances.citiesRoute.cityRoute);
router.use('/brands', AuthToken, instances.brandsRoute.brandRoute);

export default router;
