import HttpError from '@exceptions/NotAuthorizedHttpError';

import AclService from '../Services/AclService';
import { IPermissionsReturn } from '../Services/User.types';

const checkPermission = async (authorization: string, permName: string) => {
  const userController = new AclService();
  const userPermission = await userController.getProfilePermissions(
    authorization,
  );

  if (typeof userPermission === 'string') {
    const permissionsArray: IPermissionsReturn[] = JSON.parse(userPermission);
    const hasPermission = permissionsArray.find(
      permission =>
        permission.name === permName || permission.name === 'superadmin',
    );
    if (!hasPermission) {
      throw new HttpError();
    }
    return true;
  }

  const hasPermission = userPermission.find(
    permission =>
      permission.name === permName || permission.name === 'superadmin',
  );
  if (!hasPermission) {
    throw new HttpError();
  }
  return true;
};

export default checkPermission;
