import { formatCpf } from '@app/src/Shared/Domain/Utils/CpfCnpjFormatter';
import { getDateTime } from '@app/src/Shared/Domain/Utils/Date';
import { resizeColumns } from '@app/src/Shared/Infrastructure/Services/Sheets/SheetUtils';
import xlsx from 'xlsx';

import Payment from '../../Domain/Entities/Payment';
import Product from '../../Domain/Entities/Product';
import Sale from '../../Domain/Entities/Sale';
import { SaleStatusTypes } from '../../Domain/Enums/SaleStatusTypes';
import { SaleStatusTypesOptions } from '../../Domain/Enums/SaleStatusTypes.types';

export default class SheetService {
  public dataToSheet(sale: Sale[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = sale.map(item => ({
      CÓDIGO: item.getId(),
      DATA: this.prepareDate(item.getDate()),
      CLIENTE: this.prepareClienteName(item.getCustomer().getName()),
      CPF: this.prepareCpf(item.getCustomer().getCpf()),
      'VALOR FINAL': this.prepareAmount(item.getFinalValue()),
      'DESCONTO DA COMPRA': this.prepareDiscount(
        item.getDiscountAmount(),
        item.getDiscountType(),
      ),
      PRODUTOS: this.prepareProducts(item.getProducts()),
      'DESCONTOS ESPECÍFICOS': this.prepareProductDiscount(item.getProducts()),
      PAGAMENTOS: this.preparePayment(item.getPayment()),
      STATUS: this.prepareStatus(item.getStatus()),
      OBSERVAÇÃO: item.getObservation(),
    }));
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(rowsData);
    const workSheetPrepared = resizeColumns(workSheet);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetPrepared, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }

  private prepareDate(date: Date) {
    return getDateTime(date);
  }

  private prepareClienteName(customerName: string) {
    const names: string[] = customerName.split(' ');
    if (names.length >= 2) {
      const firstName: string = names[0];
      const lastName: string = names[names.length - 1];
      const initials: string = names
        .slice(1, -1)
        .map((nome: string) => `${nome.charAt(0).toUpperCase()}.`)
        .join(' ');

      return `${firstName} ${initials} ${lastName}`;
    }
    return customerName;
  }

  private prepareCpf(cpf: string) {
    return formatCpf(cpf);
  }

  private prepareProducts(products?: Product[]) {
    if (products) {
      const formattedProducts = products.map(
        product => `${product.getQuantity()} - ${product.getName()}`,
      );
      return formattedProducts.join(', ');
    }
  }

  private prepareAmount(amount: number) {
    return `R$ ${amount.toFixed(2)}`;
  }

  private prepareDiscount(amount?: number, discountType?: string) {
    if (!amount || !discountType) {
      return null;
    }
    if (discountType === 'fixed') {
      return `R$ ${amount.toFixed(2)}`;
    }
    return `${amount}%`;
  }

  private preparePayment(payments?: Payment[]) {
    if (payments) {
      const formattedPayments = payments.map(
        payment => `${payment.getInstallment()} - ${payment.getName()}`,
      );
      return formattedPayments.join(', ');
    }
  }

  private prepareStatus(status?: string) {
    if (status && SaleStatusTypes.isValid(status)) {
      const statusType = SaleStatusTypes.from(status as SaleStatusTypesOptions);
      return statusType.label();
    }
    return null;
  }

  private prepareProductDiscount(products?: Product[]) {
    if (products) {
      const formattedProducts = products
        .map(product => {
          const discountAmount = product.getDiscountAmount();
          const discountType = product.getDiscountType();
          if (!discountAmount || !discountType) {
            return null;
          }
          const discount = this.prepareDiscount(discountAmount, discountType);
          return `${product.getName()} - ${discount}`;
        })
        .filter(Boolean); // Remover valores nulos e vazios
      if (formattedProducts.length === 0) {
        return null;
      }
      return formattedProducts.join(', ');
    }
    return null;
  }
}
