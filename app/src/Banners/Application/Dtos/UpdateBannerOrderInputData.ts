export default class UpdateBannerOrderInputData {
  constructor(readonly banners: { id: number; order: number }[]) {}
}
