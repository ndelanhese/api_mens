export default class CreateConfiguratorEstimateInputData {
  constructor(
    readonly configurator_key: string,
    readonly content: JSON,
    readonly rpmContent: JSON,
  ) {}
}
