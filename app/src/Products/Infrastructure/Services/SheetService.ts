/* eslint-disable @typescript-eslint/ban-ts-comment */

import { resizeColumns } from '@app/src/Shared/Infrastructure/Services/Sheets/SheetUtils';
import HttpError from '@exceptions/HttpError';
import xlsx from 'xlsx';

import Product from '../../Domain/Entities/Product';

import {
  IColumnError,
  IProducts,
  IProductsJson,
  ISheetProducts,
} from './SheetService.types';

export default class SheetService {
  public sheetToData(file: Buffer) {
    const jsonData = this.fileToJson(file);
    if (jsonData.length < 1)
      throw new HttpError(
        400,
        'É necessário ao menos um produto para ser importado.',
      );
    return this.jsonFromSheet(jsonData);
  }

  public dataToSheet(products: Product[]): Buffer {
    const workSheetName = 'SheetJS';
    const rowsData = products.map(item => ({
      ID: item.getId(),
      NOME: item.getName(),
      DESCRIÇÃO: item.getDescription,
      'PREÇO DE ORIGEM': item.getPurchasePrice(),
      PREÇO: item.getPrice(),
      TAMANHO: item.getSize(),
      COR: item.getColor(),
      QUANTIDADE: item.getQuantity(),
      CATEGORIA: item.getCategory().getName(),
      MARCA: item.getBrand().getName(),
      FORNECEDOR: item.getSupplier().getCorporateName(),
    }));
    const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(rowsData);
    const workSheetPrepared = resizeColumns(workSheet);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheetPrepared, workSheetName);
    return xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }

  private jsonFromSheet(json: IProductsJson[]): ISheetProducts {
    const errors: IColumnError[] = [];
    //@ts-ignore
    const products: IProducts[] = json
      .map((product, index) => {
        const lineNumber = index + 2;
        const sheetLine = {
          part_number: this.parsePartNumberColumn(
            errors,
            lineNumber,
            product['PART NUMBER'],
          ),
          name: this.parseNameColumn(errors, lineNumber, product.NOME),
          description: this.parseDescriptionColumn(
            errors,
            lineNumber,
            product.DESCRIÇÃO,
          ),
          purchase_price: this.parsePurchasePriceColumn(
            product['PREÇO DE ORIGEM'],
          ),
          price: this.parsePriceColumn(errors, lineNumber, product.PREÇO),
          size: this.parseSizeColumn(product.TAMANHO),
          color: this.parseColorColumn(product.COR),
          quantity: this.parseQuantityColumn(
            errors,
            lineNumber,
            product.QUANTIDADE,
          ),
          category: this.parseCategoryColumn(
            errors,
            lineNumber,
            product.CATEGORIA,
          ),
          brand: this.parseBrandColumn(errors, lineNumber, product.MARCA),
          supplier: this.parseSupplierColumn(
            errors,
            lineNumber,
            product.FORNECEDOR,
          ),
        };
        if (!sheetLine.part_number) return;
        if (!sheetLine.name) return;
        if (!sheetLine.description) return;
        if (!sheetLine.price) return;
        if (!sheetLine.quantity) return;
        if (!sheetLine.category) return;
        if (!sheetLine.brand) return;
        if (!sheetLine.supplier) return;
        return sheetLine;
      })
      .filter(Boolean);
    return { products, errors };
  }

  private fileToJson(file: Buffer): IProductsJson[] {
    const sheetsData = xlsx.read(file);
    if (sheetsData) {
      return xlsx.utils.sheet_to_json(
        sheetsData.Sheets[sheetsData.SheetNames[0]],
      );
    }
    throw new HttpError(500, 'Não foi possível converter a tabela.');
  }

  private parsePartNumberColumn(
    errors: IColumnError[],
    line: number,
    value?: string,
  ): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      errors.push({
        line,
        column: 'PART NUMBER',
        message: 'O PART NUMBER é obrigatório.',
      });
      return null;
    }
    return valueTrimmed;
  }

  private parseNameColumn(
    errors: IColumnError[],
    line: number,
    value?: string,
  ): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      errors.push({
        line,
        column: 'PART NUMBER',
        message: 'O PART NUMBER é obrigatório.',
      });
      return null;
    }
    return valueTrimmed;
  }

  private parseDescriptionColumn(
    errors: IColumnError[],
    line: number,
    value?: string,
  ): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      errors.push({
        line,
        column: 'DESCRIÇÃO',
        message: 'A DESCRIÇÃO é obrigatória.',
      });
      return null;
    }
    return valueTrimmed;
  }

  private parsePurchasePriceColumn(value?: number | string): number | null {
    const numberValue = Number(value);
    return isNaN(numberValue) ? null : numberValue;
  }

  private parsePriceColumn(
    errors: IColumnError[],
    line: number,
    value: number | string,
  ): number | null {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      errors.push({
        line,
        column: 'PREÇO',
        message: 'O PREÇO é obrigatório.',
      });
      return null;
    }
    return numberValue;
  }

  private parseSizeColumn(value?: string): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      return null;
    }
    return valueTrimmed;
  }

  private parseColorColumn(value?: string): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      return null;
    }
    return valueTrimmed;
  }

  private parseQuantityColumn(
    errors: IColumnError[],
    line: number,
    value: number | string,
  ): number | null {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      errors.push({
        line,
        column: 'QUANTIDADE',
        message: 'A QUANTIDADE é obrigatória.',
      });
      return null;
    }
    return numberValue;
  }

  //TODO ->  Criar uma verificação para as categorias
  private parseCategoryColumn(
    errors: IColumnError[],
    line: number,
    value?: string,
  ): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      errors.push({
        line,
        column: 'CATEGORIA',
        message: 'A CATEGORIA é obrigatória.',
      });
      return null;
    }
    return valueTrimmed;
  }

  //TODO ->  Criar uma verificação para as marca
  private parseBrandColumn(
    errors: IColumnError[],
    line: number,
    value?: string,
  ): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      errors.push({
        line,
        column: 'MARCA',
        message: 'A MARCA é obrigatória.',
      });
      return null;
    }
    return valueTrimmed;
  }

  //TODO ->  Criar uma verificação para as fornecedor
  private parseSupplierColumn(
    errors: IColumnError[],
    line: number,
    value?: string,
  ): string | null {
    const valueTrimmed = value?.trim();
    if (!valueTrimmed) {
      errors.push({
        line,
        column: 'FORNECEDOR',
        message: 'O FORNECEDOR é obrigatório.',
      });
      return null;
    }
    return valueTrimmed;
  }
}
