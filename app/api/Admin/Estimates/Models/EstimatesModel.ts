import EstimateModel from '@db-models/EstimateModel';
import EstimatesProductsModel from '@db-models/EstimateProducts';
import ProductsModel from '@db-models/ProductsModel';
import HttpError from '@exceptions/HttpError';
import { IEstimate } from './EstimatesModel.types';

export default class EstimatesModel {
  public async findEstimates(): Promise<IEstimate[]> {
    try {
      const estimate = await EstimateModel.findAll({
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
                  'part_number',
                  'currency',
                  'description',
                  'exempt_price',
                ],
              },
            ],
          },
        ],
      });
      return estimate;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar os orçamentos.');
    }
  }

  public async findEstimateById(id: number): Promise<IEstimate | null> {
    try {
      const estimate = await EstimateModel.findOne({
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
                  'part_number',
                  'currency',
                  'description',
                  'exempt_price',
                ],
              },
            ],
          },
        ],
      });

      return estimate || null;
    } catch (error) {
      throw new HttpError(500, 'Erro ao buscar o orçamento.');
    }
  }
}
