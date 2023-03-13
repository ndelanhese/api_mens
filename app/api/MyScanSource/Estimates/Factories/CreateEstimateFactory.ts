import CreateEstimateInputData from '@app/src/Estimates/Application/Dtos/CreateEstimateInputData';
import { removeMask } from '@app/src/Shared/Domain/Utils/Formatter';
import { Request } from 'express';

export default class CreateEstimateFactory {
  static fromRequest(req: Request) {
    return new CreateEstimateInputData(
      req.body.name,
      req.body.email,
      req.body.phone ? removeMask(req.body.phone) : req.body.phone,
      req.body.products,
      req.body.corporate_name,
      req.body.cnpj ? removeMask(req.body.cnpj) : req.body.cnpj,
      req.body.address,
      req.body.state,
      req.body.postal_code
        ? removeMask(req.body.postal_code)
        : req.body.postal_code,
      req.body.district,
      req.body.city,
    );
  }
}
