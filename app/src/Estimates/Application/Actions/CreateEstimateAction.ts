import EstimateModel from '../../Infrastructure/Models/EstimateModel';
import Estimate from '../../Domain/Entities/Estimate';
import EstimateProducts from '../../Domain/Entities/EstimateProducts';
import EstimateProductsRepository from '../../Infrastructure/Repositories/EstimateProductsRepository';
import EstimateRepository from '../../Infrastructure/Repositories/EstimateRepository';
import CreateEstimateInputData from '../Dtos/CreateEstimateInputData';
import { makeEmailCustomerBody } from '../../Infrastructure/Mails/EstimateCustomerEmail';
import SendEmailAction from '@app/src/Shared/Application/Actions/SendEmailAction';
import SendEmailInputData from '@app/src/Shared/Application/Dtos/SendEmailInputData';
import {
  emailsAdmin,
  manufacturersEmails,
} from '../../Domain/Enums/ManufacturersEmails';
import { ProductsData } from './CreateEstimateAction.types';
import { makeEmailManufacturerBody } from '../../Infrastructure/Mails/EstimateManufacturerEmail';

export default class CreateEstimateAction {
  async execute(input: CreateEstimateInputData): Promise<Estimate> {
    const estimateRepository = new EstimateRepository();
    const estimate = new Estimate(
      input.name,
      input.email,
      input.phone,
      input.corporate_name,
      input.cnpj,
      input.address,
      input.state,
      input.postal_code,
      input.district,
      input.city,
    );
    const estimateCreated = await estimateRepository.save(estimate);
    const estimateProducts = input.products.map(
      (product) =>
        new EstimateProducts(
          product.product_id,
          Number(estimateCreated.getId()),
          product.qtd,
        ),
    );
    const estimateProductsRepository = new EstimateProductsRepository();
    await estimateProductsRepository.save(estimateProducts);
    await this.sendEmails(input, Number(estimateCreated.getId()));
    return estimateCreated;
  }

  private async sendEmails(input: CreateEstimateInputData, estimateId: number) {
    const estimatesModel = new EstimateModel();
    const { products: estimateProducts } =
      await estimatesModel.findEstimateById(estimateId);
    const products = estimateProducts.map(({ qtd, product }) => ({
      manufacturer: product.manufacturer_slug,
      partNumber: product.part_number,
      description: product.description,
      qtd,
      exemptPrice: product.exempt_price,
      currency: product.currency,
    }));
    const customerEmailInputData = this.customerEmail(input, products);
    const manufacturerEmailInputData = this.manufacturersEmail(input, products);
    const emailAction = new SendEmailAction();
    emailAction.execute(customerEmailInputData);
    emailAction.execute(manufacturerEmailInputData);
  }

  private customerEmail(
    input: CreateEstimateInputData,
    products: ProductsData[],
  ) {
    const emailCustomerBody = makeEmailCustomerBody({
      name: input.name,
      email: input.email,
      phone: input.phone,
      corporateName: input.corporate_name ?? '',
      uf: input.state ?? '',
      cnpj: input.cnpj ?? '',
      products,
    });
    const scanSourceFromEmail = 'no-reply@scansource.com.br';
    const scanSourceSubjectEmail =
      'Solicitação de Orçamento ScanSource - Consulta de Estoque';
    return new SendEmailInputData(
      scanSourceFromEmail,
      input.email,
      emailsAdmin.ADMIN,
      scanSourceSubjectEmail,
      emailCustomerBody,
    );
  }
  private manufacturersEmail(
    input: CreateEstimateInputData,
    products: ProductsData[],
  ) {
    const manufacturers = [
      ...new Set(products.map((product) => product.manufacturer)),
    ];
    const emails: string[] = [input.email];
    manufacturers.map((manufacturer) => {
      const emailsManufacturer =
        manufacturersEmails[manufacturer.toUpperCase()];
      emailsManufacturer.map((email) => {
        emails.push(email);
      });
    });
    const emailManufacturerBody = makeEmailManufacturerBody({
      name: input.name,
      email: input.email,
      phone: input.phone,
      corporateName: input.corporate_name ?? '',
      uf: input.state ?? '',
      cnpj: input.cnpj ?? '',
      products,
    });
    const scanSourceFromEmail = 'no-reply@scansource.com.br';
    const scanSourceSubjectEmail =
      'Solicitação de Orçamento ScanSource - Consulta de Estoque';
    return new SendEmailInputData(
      scanSourceFromEmail,
      emails,
      emailsAdmin.ADMIN,
      scanSourceSubjectEmail,
      emailManufacturerBody,
    );
  }
}
