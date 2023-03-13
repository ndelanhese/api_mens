import AwsStorage from '../../Infrastructure/Repositories/AwsStorageRepository';
import AzureStorage from '../../Infrastructure/Repositories/AzureStorageRepository';
import LocalStorage from '../../Infrastructure/Repositories/LocalStorageRepository';
import Media from '../Entities/Media';

export default class DisksService {
  private disk: string;
  constructor() {
    this.disk = process.env.DISK ?? 'local';
  }
  async create(image: Buffer, key: string, mimeType: string): Promise<string> {
    if (this.disk === 's3') {
      const awsStorage = new AwsStorage();
      return awsStorage.createAwsStorage(image, key, mimeType);
    }
    if (this.disk === 'azure') {
      const azureStorage = new AzureStorage();
      return azureStorage.createAzureStorage(image, key);
    }
    const localStorage = new LocalStorage();
    return localStorage.createLocalStorage(image, key);
  }
  async delete(media: Media): Promise<void> {
    if (this.disk === 's3') {
      const awsStorage = new AwsStorage();
      return awsStorage.deleteAwsStorage(media);
    }
    if (this.disk === 'azure') {
      const azureStorage = new AzureStorage();
      return azureStorage.deleteAzureStorage(media);
    }
    const localStorage = new LocalStorage();
    return localStorage.deleteLocalStorage(media);
  }
}
