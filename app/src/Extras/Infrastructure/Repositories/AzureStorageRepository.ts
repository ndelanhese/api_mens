import { BlobServiceClient } from '@azure/storage-blob';

import Media from '../../Domain/Entities/Media';

export default class AzureStorage {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;
  constructor() {
    const account = process.env.AZURE_STORAGE_CONNECTION_STRING ?? '';
    this.blobServiceClient = BlobServiceClient.fromConnectionString(account);
    this.containerName = process.env.AZURE_CONTAINER_NAME ?? '';
  }
  createAzureStorage = async (media: Buffer, key: string): Promise<string> => {
    const uploadOptions = {
      metadata: {
        owner: 'mens-admin',
      },
      tags: {
        createdBy: 'mens-admin',
        createdWith: 'e-code',
        createdOn: new Date().toDateString(),
      },
    };
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(key);
    await blockBlobClient.uploadData(media, uploadOptions);
    return blockBlobClient.url;
  };

  deleteAzureStorage = async (media: Media) => {
    const containerClient = this.blobServiceClient.getContainerClient(
      this.containerName,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(media.getKey());
    await blockBlobClient.deleteIfExists();
  };
}
