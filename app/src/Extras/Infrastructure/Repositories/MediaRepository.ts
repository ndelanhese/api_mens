import Media from '../../Domain/Entities/Media';
import MediaModel from '../Models/MediaModel';
export default class MediaRepository {
  private mediaModel: MediaModel;
  constructor() {
    this.mediaModel = new MediaModel();
  }
  async save(media: Media): Promise<Media> {
    return await this.create(media);
  }
  async create(media: Media): Promise<Media> {
    const { id } = await this.mediaModel.create(media);
    return media.setId(id);
  }
  async delete(media: Media): Promise<void> {
    await this.mediaModel.deleteMedia(media);
  }
  async getMediaById(id: number) {
    return await this.mediaModel.getMediaById(id);
  }
}
