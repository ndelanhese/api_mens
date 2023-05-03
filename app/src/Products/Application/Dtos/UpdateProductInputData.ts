import Brand from '../../Domain/Entities/Brand';
import Category from '../../Domain/Entities/Category';
import Supplier from '../../Domain/Entities/Supplier';

export default class UpdateProductInputData {
  constructor(
    readonly part_number?: string,
    readonly name?: string,
    readonly description?: string,
    readonly price?: number,
    readonly quantity?: number,
    readonly category?: Category,
    readonly brand?: Brand,
    readonly supplier?: Supplier,
    readonly purchase_price?: number,
    readonly size?: string,
    readonly color?: string,
  ) {}
}
