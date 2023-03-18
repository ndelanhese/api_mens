import HttpError from '@exceptions/HttpError';
import fileUpload from 'express-fileupload';

import MediaRepository from '../../Infrastructure/Repositories/MediaRepository';
import Media from '../Entities/Media';

import DisksService from './DisksService';

export default class MediasService {
  public async createMedia(
    uploadedFile: fileUpload.UploadedFile,
  ): Promise<Media | undefined> {
    try {
      const originalName = uploadedFile.name;
      const extension = Media.getExtensionFile(originalName);
      const filename = Media.generateUniqueName(originalName, extension);
      const { mimetype } = uploadedFile;
      const { size } = uploadedFile;
      const path = Media.generatePath(mimetype);
      const dataToJson = JSON.parse(String(size));
      const key = Media.generateKey(filename, path);
      const diskService = new DisksService();
      const urlDisk = await diskService.create(
        uploadedFile.data,
        key,
        mimetype,
      );
      const media = new Media(
        filename,
        mimetype,
        size,
        urlDisk,
        extension,
        path,
        key,
        'public',
        dataToJson,
      );
      const mediaRepository = new MediaRepository();
      const created = await mediaRepository.save(media);
      return created;
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }

  public async deleteMedia(id: number): Promise<void> {
    try {
      const mediaRepository = new MediaRepository();
      const media = await mediaRepository.getMediaById(id);
      if (!media) throw new HttpError(500, 'Erro ao tentar deletar media.');
      const mediaEntity = new Media(
        media.name,
        media.mimetype,
        media.size,
        media.url,
        media.extension,
        media.path,
        media.key,
        media.visibility,
        media.data,
        media.id,
      );
      const diskService = new DisksService();
      await diskService.delete(mediaEntity);
      await mediaRepository.delete(mediaEntity);
    } catch (error) {
      if (error instanceof HttpError) {
        throw new HttpError(error.statusCode, error.message);
      }
    }
  }
}
