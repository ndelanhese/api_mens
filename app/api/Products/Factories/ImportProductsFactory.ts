import ImportProductsInputData from '@app/src/Products/Application/Dtos/ImportProductsInputData';
import HttpError from '@exceptions/HttpError';
import { Request } from 'express';

export default class ImportProductsFactory {
  static fromRequest(req: Request) {
    const table = req?.files?.file;
    if (!table || Array.isArray(table)) {
      throw new HttpError(400, 'Arquivo inválido.');
    }
    return new ImportProductsInputData(table.data);
  }
}
