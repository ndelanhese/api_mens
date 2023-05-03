// import CreateProductInputData from '@app/src/Products/Application/Dtos/CreateProductInputData';
// import convertToIso from '@app/src/Shared/Domain/Utils/Currencies';
// import { Request } from 'express';

// export default class CreateProductFactory {
//   static fromRequest(req: Request, manufacturer_slug: string) {
//     return new CreateProductInputData(
//       manufacturer_slug,
//       req.body.type,
//       req.body.part_number,
//       req.body.description,
//       req.body.currency ? convertToIso(req.body.currency) : 'USD',
//       req.body.outlet,
//       req.body.contributor_price,
//       req.body.exempt_price,
//       req.body.observation,
//       req.body.disclaimer,
//     );
//   }
// }
