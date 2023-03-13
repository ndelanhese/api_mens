import HttpError from '@exceptions/HttpError';
import MediaModel from '@db-models/MediasModel';
import Media from '../../Domain/Entities/Media';
import { IMedia } from './MediaModel.types';

export default class MediasModel {
  public async create(media: Media): Promise<IMedia> {
    try {
      const rows = await MediaModel.create({
        name: media.getName(),
        path: media.getPath(),
        key: media.getKey(),
        url: media.getUrl(),
        mimetype: media.getMimeType(),
        extension: media.getExtension(),
        size: media.getSize(),
        visibility: media.getVisibility(),
        data: media.getData(),
      });
      return rows;
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async deleteMedia(media: Media): Promise<void> {
    try {
      await MediaModel.destroy({
        where: { id: media.getId() },
      });
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }

  public async getMediaById(id: number): Promise<IMedia | null> {
    try {
      return await MediaModel.findByPk(id);
    } catch (error) {
      throw new HttpError(500, 'Erro no Servidor.');
    }
  }
}
