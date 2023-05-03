// import UpdateProductInputData from '@app/src/Products/Application/Dtos/UpdateProductInputData';
// import Product from '@app/src/Products/Domain/Entities/Product';
// import convertToIso from '@app/src/Shared/Domain/Utils/Currencies';
// import { Request } from 'express';

// import { IProduct } from './UpdateProductFactory.types';

// export default class UpdateProductFactory {
//   static fromRequest(req: Request, manufacturer_slug: string) {
//     return new UpdateProductInputData(
//       manufacturer_slug,
//       req.body.type,
//       req.body.part_number,
//       req.body.description,
//       req.body.currency ? convertToIso(req.body.currency) : 'USD',
//       req.body.contributor_price,
//       req.body.outlet,
//       req.body.exempt_price,
//       req.body.observation,
//       req.body.disclaimer,
//     );
//   }
//   static currentValueFromRequest(currentValue: IProduct) {
//     return new Product(
//       currentValue.manufacturer_slug,
//       currentValue.type,
//       currentValue.part_number,
//       currentValue.description,
//       currentValue.currency,
//       currentValue.outlet,
//       currentValue.contributor_price,
//       currentValue.exempt_price,
//       currentValue.observation,
//       currentValue.disclaimer,
//       currentValue.id,
//     );
//   }
// }
