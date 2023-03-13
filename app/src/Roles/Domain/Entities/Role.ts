export default class Role {
  private id?: number;
  private name: string;
  private description: string;

  constructor(name: string, description: string, id?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getDescription() {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
    return this;
  }
}
