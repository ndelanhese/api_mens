import AdminAclRoute from '@app/api/Acl/Routes/AclRoute';
import AdminLoginRoute from '@app/api/Auth/Routes/AuthRoute';
import AuthToken from '@auth-middleware/AuthMiddleware';
import { Router, Request, Response } from 'express';

const router = Router();

const prepareInstance = () => {
  const loginRoute = new AdminLoginRoute();
  const aclRoute = new AdminAclRoute();

  return {
    loginRoute,
    aclRoute,
  };
};
const instances = prepareInstance();
router.post('/ping', (req: Request, res: Response) => {
  return res.status(200).json('pong');
});
router.use('/auth', instances.loginRoute.authRoute);
router.use('/acl', AuthToken, instances.aclRoute.aclRoutes);

export default router;
