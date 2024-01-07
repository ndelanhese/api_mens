import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';
import getDate from '@app/src/Shared/Infrastructure/Utils/Date';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import User from '../../Domain/Entities/User';
import ListCustomersModel from '../../Infrastructure/Models/CustomersModel';
import ProductsModel from '../../Infrastructure/Models/ProductsModel';
import { PromotionProductsModel } from '../../Infrastructure/Models/PromotionProductsModel';
import { PromotionsModel } from '../../Infrastructure/Models/PromotionsModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import CreateSaleInputData from '../Dtos/CreateSaleInputData';

interface Promotion {
  discount_type: string;
  discount_amount: number;
  discount_formatted: string;
}

export default class CreateSaleAction {
  async execute(input: CreateSaleInputData) {
    const salesRepository = new SalesRepository();
    const customer = await this.getCustomer(input.customer_id);
    const user = await this.getUser(input.user_id);
    const paymentMethods = input.sale_payment_methods.map(
      paymentMethod =>
        new Payment(paymentMethod.type, paymentMethod.installment),
    );
    const productsPromise = input.sale_products.map(async product => {
      const productData = await this.getProduct(product.id);
      const discount = await this.prepareProductDiscount(
        product.id,
        productData.price,
      );

      if (productData.quantity < product.quantity) {
        throw new HttpError(400, 'Quantidade de produtos indisponível.');
      }

      return new Product(
        product.id,
        product.quantity,
        discount.final_price ?? productData.price,
        discount.discount_amount,
        discount.discount_type,
      );
    });
    const products = await Promise.all(productsPromise);
    const sale = new Sale(
      getDate(input.date),
      input.total_value,
      input.final_value,
      customer,
      user,
      paymentMethods,
      products,
      input.observation,
      input.discount_amount,
      input.discount_type,
      input.status,
    );
    return await salesRepository.save(sale);
  }

  private async getCustomer(customer_id: number) {
    const customerModel = new ListCustomersModel();
    const customer = await customerModel.getCustomer(customer_id);
    return new Customer(
      customer.name,
      customer.cpf,
      customer.birth_date,
      customer.phone,
      customer.status,
      customer.rg,
      customer.id,
    );
  }

  private async getUser(user_id: number) {
    const userModel = new UserModel();
    const user = await userModel.getUser(user_id);
    const { employee: employeeData } = user;
    const employee = new Employee(
      employeeData.name,
      employeeData.cpf,
      employeeData.id,
    );
    return new User(user.user, user.email, employee, user.id);
  }

  private async getProduct(product_id: number) {
    const productModel = new ProductsModel();
    return await productModel.getProduct(product_id);
  }

  private async getPromotionsByProduct(productId: number) {
    const productsPromotionsModel = new PromotionProductsModel();
    return await productsPromotionsModel.getPromotionsByProduct(productId);
  }

  private async getPromotionById(promotionId: number) {
    const promotionsModel = new PromotionsModel();
    return await promotionsModel.getPromotion(promotionId);
  }

  private calculateDiscount(productPrice: number, promotion: Promotion | null) {
    if (!promotion) return { discount: 0, finalPrice: productPrice };

    let discount: number;
    if (promotion.discount_type === 'fixed') {
      discount = Math.min(promotion.discount_amount, productPrice);
    } else {
      const percentageDiscount =
        (productPrice * promotion.discount_amount) / 100;
      discount = Math.min(percentageDiscount, productPrice);
    }

    const finalPrice = productPrice - discount;

    return { discount, finalPrice };
  }

  private async prepareProductDiscount(
    productId: number,
    productPrice: number,
  ) {
    const productPromotions = await this.getPromotionsByProduct(productId);

    if (!productPromotions || productPromotions.length < 1) return {};

    const promotionPromises = productPromotions.map(
      async promotion => await this.getPromotionById(promotion.promotion_id),
    );
    const promotions: Promotion[] = (await Promise.all(
      promotionPromises,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;

    if (!promotions || promotions.length < 1) return {};

    let minFinalPrice = Infinity;
    let minFinalPricePromotion: Promotion | undefined;

    for (const promotion of promotions) {
      const { finalPrice } = this.calculateDiscount(
        productPrice,
        promotion as Promotion,
      );

      if (finalPrice < minFinalPrice) {
        minFinalPrice = finalPrice;
        minFinalPricePromotion = promotion;
      }
    }

    if (minFinalPricePromotion) {
      const { discount_type, discount_amount } = minFinalPricePromotion;
      return {
        discount_type,
        discount_amount,
        final_price: minFinalPrice,
      };
    }

    return {};
  }
}
