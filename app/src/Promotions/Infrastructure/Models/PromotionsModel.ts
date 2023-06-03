import promotionsModel from '@db-models/PromotionsModel';
import promotionsProductsModel from '@db-models/PromotionsProductsModel';
import HttpError from '@exceptions/HttpError';

import Promotion from '../../Domain/Entities/Promotion';

export default class PromotionsModel {
  public async createPromotion(payload: Promotion) {
    try {
      const promotionCategory = payload.getPromotionCategory()?.getId() ?? 1;
      const promotion = await promotionsModel.create({
        name: payload.getName(),
        description: payload.getDescription(),
        discount_amount: payload.getDiscountAmount(),
        discount_type: payload.getDiscountType(),
        initial_date: payload.getInitialDate(),
        final_date: payload.getFinalDate(),
        status: payload.getStatus(),
        promotion_category_id: promotionCategory,
      });
      const promotionsProducts = payload.getProducts();
      if (promotionsProducts) {
        const products = promotionsProducts.map(product => ({
          promotion_id: promotion.id,
          product_id: product.getProductId(),
        }));
        await promotionsProductsModel.bulkCreate(products);
      }
      return promotion;
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar promoção.', error);
    }
  }

  public async updatePromotion(payload: Promotion): Promise<void> {
    try {
      const promotionCategory = payload.getPromotionCategory()?.getId() ?? 1;
      await promotionsModel.update(
        {
          name: payload.getName(),
          description: payload.getDescription(),
          discount_amount: payload.getDiscountAmount(),
          discount_type: payload.getDiscountType(),
          initial_date: payload.getInitialDate(),
          final_date: payload.getFinalDate(),
          status: payload.getStatus(),
          promotion_category_id: promotionCategory,
        },
        {
          where: {
            id: payload.getId(),
          },
        },
      );
      await promotionsProductsModel.destroy({
        where: { promotion_id: payload.getId() },
      });
      const promotionsProducts = payload.getProducts();
      if (promotionsProducts) {
        const products = promotionsProducts.map(product => ({
          promotion_id: Number(payload.getId()),
          product_id: Number(product.getProductId()),
        }));
        await promotionsProductsModel.bulkCreate(products);
      }
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar o promoção.', error);
    }
  }

  public async updatePromotionDate(
    id: number,
    initial_date?: Date,
    final_date?: Date,
  ) {
    try {
      await promotionsModel.update(
        {
          initial_date,
          final_date,
        },
        {
          where: {
            id,
          },
        },
      );
    } catch (error) {
      throw new HttpError(500, 'Erro ao atualizar o data do promoção.', error);
    }
  }

  public async deletePromotion(id: number): Promise<void> {
    try {
      await promotionsModel.destroy({
        where: {
          id,
        },
        cascade: true,
      });
    } catch (error) {
      throw new HttpError(500, 'Erro ao deletar o promoção.', error);
    }
  }

  public async getPromotion(id: number) {
    try {
      const promotion = await promotionsModel.findByPk(id, {
        include: { all: true },
      });
      if (!promotion) throw new HttpError(404, 'Promoção não encontrada.');
      return promotion;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, 'Erro ao buscar promoção.', error);
    }
  }
}
