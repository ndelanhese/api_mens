import HttpError from '@exceptions/NotAuthorizedHttpError';

import { IPermissionsReturn } from '../Controllers/UserController.types';
import UserController from '../Controllers/UserPermissionsController';

const checkPermission = async (authorization: string, permName: string) => {
  const userController = new UserController();
  const userPermission = await userController.getProfilePermissions(
    authorization,
  );

  if (typeof userPermission === 'string') {
    const permissionsArray: IPermissionsReturn[] = JSON.parse(userPermission);
    const hasPermission = permissionsArray.find(
      permission => permission.name === permName,
    );
    if (!hasPermission) {
      throw new HttpError();
    }
    return true;
  }

  const hasPermission = userPermission.find(
    permission => permission.name === permName,
  );
  if (!hasPermission) {
    throw new HttpError();
  }
  return true;
};

export default checkPermission;
