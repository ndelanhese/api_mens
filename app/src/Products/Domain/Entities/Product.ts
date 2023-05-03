import Brand from './Brand';
import Category from './Category';
import Supplier from './Supplier';

export default class Product {
  private id?: number;
  private part_number: string;
  private name: string;
  private description: string;
  private purchase_price?: number;
  private price: number;
  private size?: string;
  private color?: string;
  private quantity: number;
  private category: Category;
  private brand: Brand;
  private supplier: Supplier;

  constructor(
    part_number: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    category: Category,
    brand: Brand,
    supplier: Supplier,
    purchase_price?: number,
    size?: string,
    color?: string,
    id?: number,
  ) {
    this.id = id;
    this.part_number = part_number;
    this.name = name;
    this.description = description;
    this.purchase_price = purchase_price;
    this.price = price;
    this.size = size;
    this.color = color;
    this.quantity = quantity;
    this.category = category;
    this.brand = brand;
    this.supplier = supplier;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getPartNumber(): string {
    return this.part_number;
  }

  public setPartNumber(part_number: string) {
    this.part_number = part_number;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }

  public getPurchasePrice() {
    return this.purchase_price;
  }

  public setPurchasePrice(purchase_price: number) {
    this.purchase_price = purchase_price;
    return this;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number) {
    this.price = price;
    return this;
  }

  public getSize() {
    return this.size;
  }

  public setSize(size: string) {
    this.size = size;
    return this;
  }

  public getColor() {
    return this.color;
  }

  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
    return this;
  }

  public getCategory(): Category {
    return this.category;
  }

  public setCategory(category: Category) {
    this.category = category;
    return this;
  }

  public getBrand(): Brand {
    return this.brand;
  }

  public setBrand(brand: Brand) {
    this.brand = brand;
    return this;
  }

  public getSupplier(): Supplier {
    return this.supplier;
  }

  public setSupplier(supplier: Supplier) {
    this.supplier = supplier;
    return this;
  }
}
