/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductsModel from '@app/database/Models/ProductsModel';
import PromotionsCategoriesModel from '@app/database/Models/PromotionsCategoriesModel';
import PromotionsProductsModel from '@app/database/Models/PromotionsProductsModel';
import PromotionCategory from '@app/src/Promotions/Domain/Entities/PromotionCategory';
import salesModel from '@db-models/PromotionsModel';
import HttpError from '@exceptions/HttpError';
import { WhereOptions } from 'sequelize';

import { Product, Promotion } from './PromotionsModel.types';

export default class PromotionsModel {
  public async getPromotions(status?: string) {
    try {
      let whereClause: WhereOptions = {};
      if (status) whereClause = { status };
      const promotions: any = await salesModel.findAll({
        where: whereClause,
        order: [['id', 'DESC']],
        include: [
          {
            model: PromotionsCategoriesModel,
            as: 'category',
          },
          {
            model: PromotionsProductsModel,
            as: 'products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
              },
            ],
          },
        ],
      });
      const simplifiedPromotions = promotions.map((promotion: any) => {
        const promotionData = promotion.toJSON() as Promotion;
        const categoryData = promotion.category.toJSON() as PromotionCategory;
        const productData = promotion.products.map((product: any) =>
          product.product.toJSON(),
        ) as Product[];

        return {
          ...promotionData,
          category: categoryData,
          products: productData,
        };
      });

      return simplifiedPromotions;
    } catch (error) {
      throw new HttpError(500, 'Erro ao listar promoções.', error);
    }
  }

  public async getPromotion(id: number) {
    try {
      const sale = await salesModel.findByPk(id, {
        include: [
          {
            model: PromotionsCategoriesModel,
            as: 'category',
          },
          {
            model: PromotionsProductsModel,
            as: 'products',
            include: [
              {
                model: ProductsModel,
                as: 'product',
              },
            ],
          },
        ],
      });
      if (!sale) throw new HttpError(404, 'Promoção não encontrada.');
      return sale;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar promoção.', error);
    }
  }
}
