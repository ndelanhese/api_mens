import express, { Router } from 'express';
import UsersController from '../Controllers/UsersController';
import createUserMiddleware from '../Middleware/CreateUserMiddleware';
import deleteUserMiddleware from '../Middleware/DeleteUserMiddleware';
import restoreUserMiddleware from '../Middleware/RestoreUserMiddleware';
import updateRolesAndPermissionMiddleware from '../Middleware/UpdateRolesAndPermissionsMiddleware';
import updateUserMiddleware from '../Middleware/UpdateUserMiddleware';

export default class UsersRoute {
  private usersRoute: Router;

  private userController: UsersController;

  constructor() {
    this.usersRoute = express.Router();
    this.userController = new UsersController();
    this.setup();
  }

  private setup(): void {
    const getUsers = this.userController.getUsers.bind(this.userController);
    const getUser = this.userController.getUserById.bind(this.userController);
    const getDeletedUsers = this.userController.getDeletedUsers.bind(
      this.userController,
    );
    const createUser = this.userController.createUser.bind(this.userController);
    const deleteUser = this.userController.deleteUser.bind(this.userController);
    const restoreUser = this.userController.restoreUser.bind(
      this.userController,
    );
    const updateRolesAndPermission =
      this.userController.updateRolesAndPermission.bind(this.userController);
    const updateUser = this.userController.updateUser.bind(this.userController);

    this.usersRoute.get('/trash', getDeletedUsers);
    this.usersRoute.get('/', getUsers);
    this.usersRoute.get('/:id', getUser);
    this.usersRoute.post('/', createUserMiddleware, createUser);
    this.usersRoute.delete('/:id', deleteUserMiddleware, deleteUser);
    this.usersRoute.patch('/:id/restore', restoreUserMiddleware, restoreUser);
    this.usersRoute.put(
      '/:id/roles',
      updateRolesAndPermissionMiddleware,
      updateRolesAndPermission,
    );
    this.usersRoute.put('/:id', updateUserMiddleware, updateUser);
  }

  get userRoute() {
    return this.usersRoute;
  }
}
