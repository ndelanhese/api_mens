import AddressesRoute from '@api/Addresses/Routes/AddressesRoute';
import CategoriesRoute from '@api/Categories/Routes/CategoriesRoute';
import CustomersRoute from '@api/Customers/Routes/CustomersRoute';
import EmployeesRoute from '@api/Employees/Routes/EmployeesRoute';
import OrdersRoute from '@api/Orders/Routes/OrdersRoute';
import ProductsRoute from '@api/Products/Routes/ProductsRoute';
import SalesRoute from '@api/Sales/Routes/SalesRoute';
import SuppliersRoute from '@api/Suppliers/Routes/SuppliersRoute';
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
  const categoriesRoute = new CategoriesRoute();
  const customersRoute = new CustomersRoute();
  const employeesRoute = new EmployeesRoute();
  const suppliersRoute = new SuppliersRoute();
  const productsRoute = new ProductsRoute();
  const salesRoute = new SalesRoute();
  const addressesRoute = new AddressesRoute();
  const ordersRoute = new OrdersRoute();

  return {
    loginRoute,
    aclRoute,
    usersRoute,
    statesRoute,
    citiesRoute,
    brandsRoute,
    categoriesRoute,
    customersRoute,
    employeesRoute,
    suppliersRoute,
    productsRoute,
    salesRoute,
    addressesRoute,
    ordersRoute,
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
router.use('/categories', AuthToken, instances.categoriesRoute.categoryRoute);
router.use('/customers', AuthToken, instances.customersRoute.customerRoute);
router.use('/employees', AuthToken, instances.employeesRoute.employeeRoute);
router.use('/suppliers', AuthToken, instances.suppliersRoute.supplierRoute);
router.use('/products', AuthToken, instances.productsRoute.productRoute);
router.use('/sales', AuthToken, instances.salesRoute.saleRoute);
router.use('/addresses', AuthToken, instances.addressesRoute.addressRoute);
router.use('/orders', AuthToken, instances.ordersRoute.orderRoute);

export default router;
