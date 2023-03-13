export default class ConfiguratorEstimate {
  private id?: number;
  private configurator_key: string;
  private content: JSON;
  private rpm_content: JSON;

  constructor(
    configurator_key: string,
    content: JSON,
    rpm_content: JSON,
    id?: number,
  ) {
    this.id = id;
    this.configurator_key = configurator_key;
    this.content = content;
    this.rpm_content = rpm_content;
  }

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public getConfiguratorKey(): string {
    return this.configurator_key;
  }

  public setConfiguratorKey(configurator_key: string) {
    this.configurator_key = configurator_key;
    return this;
  }

  public getContent(): JSON {
    return this.content;
  }

  public setContent(content: JSON) {
    this.content = content;
    return this;
  }

  public getRpmContent(): JSON {
    return this.rpm_content;
  }

  public setRpmContent(rpm_content: JSON) {
    this.rpm_content = rpm_content;
    return this;
  }
}
