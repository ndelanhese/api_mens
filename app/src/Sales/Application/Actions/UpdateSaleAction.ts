import HttpError from '@app/src/Shared/Domain/Exceptions/HttpError';

import Customer from '../../Domain/Entities/Customer';
import Employee from '../../Domain/Entities/Employee';
import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import User from '../../Domain/Entities/User';
import CustomersModel from '../../Infrastructure/Models/CustomersModel';
import ProductsModel from '../../Infrastructure/Models/ProductsModel';
import { PromotionProductsModel } from '../../Infrastructure/Models/PromotionProductsModel';
import { PromotionsModel } from '../../Infrastructure/Models/PromotionsModel';
import UserModel from '../../Infrastructure/Models/UsersModel';
import SalesRepository from '../../Infrastructure/Repositories/SalesRepository';
import UpdateSaleInputData from '../Dtos/UpdateSaleInputData';

interface Promotion {
  discount_type: string;
  discount_amount: number;
  discount_formatted: string;
}

export default class UpdateSaleAction {
  async execute(input: UpdateSaleInputData) {
    const currentSale = await this.getCurrentSale(input.id);
    const customerId = input.customer_id ?? currentSale.customer_id;
    const userId = input.user_id ?? currentSale.user_id;
    const customer = await this.getCustomer(customerId);
    const user = await this.getUser(userId);
    const paymentMethods = this.preparePaymentMethods(input);
    const products = await this.prepareProducts(
      input,
      currentSale as UpdateSaleInputData,
    );
    const sale = new Sale(
      currentSale.date,
      input.total_value ?? currentSale.total_value,
      input.final_value ?? currentSale.final_value,
      customer,
      user,
      paymentMethods,
      products,
      input.observation ?? currentSale.observation,
      input.discount_amount ?? currentSale.discount_amount,
      input.discount_type ?? currentSale.discount_type,
      input.status ?? currentSale.status,
      currentSale.id,
    );
    const saleRepository = new SalesRepository();
    await saleRepository.save(sale);
  }

  private async getCurrentSale(id: number) {
    const salesRepository = new SalesRepository();
    return await salesRepository.getSale(id);
  }
  private async getCustomer(id: number) {
    const customerModel = new CustomersModel();
    const customer = await customerModel.getCustomer(id);
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
  private async getUser(id: number) {
    const userModel = new UserModel();
    const user = await userModel.getUser(id);
    const employee = new Employee(
      user.employee.name,
      user.employee.cpf,
      user.employee.id,
    );
    return new User(user.user, user.email, employee, user.id);
  }

  private preparePaymentMethods(input: UpdateSaleInputData) {
    if (!input.sale_payment_methods) {
      return undefined;
    }
    return input.sale_payment_methods.map(
      paymentMethod =>
        new Payment(paymentMethod.type, paymentMethod.installment),
    );
  }

  private async getProduct(product_id: number) {
    const productModel = new ProductsModel();
    return await productModel.getProduct(product_id);
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

  private async getPromotionsByProduct(productId: number) {
    const productsPromotionsModel = new PromotionProductsModel();
    return await productsPromotionsModel.getPromotionsByProduct(productId);
  }

  private async getPromotionById(promotionId: number) {
    const promotionsModel = new PromotionsModel();
    return await promotionsModel.getPromotion(promotionId);
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

  private async prepareProducts(
    input: UpdateSaleInputData,
    currentSale: UpdateSaleInputData,
  ) {
    if (!input.sale_products) {
      return undefined;
    }

    const productsPromise = input.sale_products.map(async (product, index) => {
      const productData = await this.getProduct(product.id);
      const discount = await this.prepareProductDiscount(
        product.id,
        productData.price,
      );

      const { sale_products } = currentSale;

      if (
        productData.quantity < product.quantity &&
        sale_products &&
        product.quantity > sale_products[index].quantity
      ) {
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
    return await Promise.all(productsPromise);
  }
}
