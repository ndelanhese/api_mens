import AclRoute from '@app/api/Acl/Routes/AclRoute';
import LoginRoute from '@app/api/Auth/Routes/AuthRoute';
import UsersRoute from '@app/api/Users/Routes/UsersRoute';
import AuthToken from '@auth-middleware/AuthMiddleware';
import { Router, Request, Response } from 'express';

const router = Router();

const prepareInstance = () => {
  const loginRoute = new LoginRoute();
  const aclRoute = new AclRoute();
  const usersRoute = new UsersRoute();

  return {
    loginRoute,
    aclRoute,
    usersRoute,
  };
};
const instances = prepareInstance();
router.post('/ping', (req: Request, res: Response) => {
  return res.status(200).json('pong');
});
router.use('/auth', instances.loginRoute.authRoute);
router.use('/acl', AuthToken, instances.aclRoute.aclRoutes);
router.use('/users', AuthToken, instances.usersRoute.userRoute);

export default router;
