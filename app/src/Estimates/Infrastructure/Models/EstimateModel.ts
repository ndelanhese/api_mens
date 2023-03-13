import EstimateModel from '@db-models/EstimateModel';
import HttpError from '@exceptions/HttpError';
import Estimate from '../../Domain/Entities/Estimate';
import EstimatesProductsModel from '@db-models/EstimateProducts';
import ProductsModel from '@db-models/ProductsModel';
import { IEstimate } from './EstimatesModel.types';

export default class EstimatesModel {
  public async createEstimate(payload: Estimate) {
    try {
      return await EstimateModel.create({
        name: payload.getName(),
        email: payload.getEmail(),
        phone: payload.getPhone(),
        corporate_name: payload.getCorporateName(),
        cnpj: payload.getCnpj(),
        address: payload.getAddress(),
        state: payload.getState(),
        postal_code: payload.getPostalCode(),
        district: payload.getDistrict(),
        city: payload.getCity(),
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar orçamento.');
    }
  }

  public async findEstimateById(id: number): Promise<IEstimate> {
    try {
      const estimate: any = await EstimateModel.findOne({
        where: { id },
        include: [
          {
            model: EstimatesProductsModel,
            as: 'products',
            attributes: ['qtd'],
            include: [
              {
                model: ProductsModel,
                as: 'product',
                attributes: [
                  'manufacturer_slug',
                  'part_number',
                  'description',
                  'currency',
                  'exempt_price',
                ],
              },
            ],
          },
        ],
      });
      if (!estimate) throw new HttpError(500, 'Erro ao buscar orçamento.');
      return estimate;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar o orçamento.');
    }
  }
}
