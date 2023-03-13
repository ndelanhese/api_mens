import aws from 'aws-sdk';
import HttpError from '@exceptions/HttpError';
import Media from '../../Domain/Entities/Media';

export default class AwsStorage {
  private awsClient: aws.S3;
  private bucket: string;
  constructor() {
    const region = process.env.AWS_S3_REGION ?? 'us-east-1';
    const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID ?? '';
    const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY ?? '';
    this.bucket = process.env.AWS_S3_BUCKET_NAME ?? 'test';
    this.awsClient = new aws.S3({
      accessKeyId,
      secretAccessKey,
      region,
    });
  }
  createAwsStorage = async (media: Buffer, key: string, mimeType: string) => {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: media,
      ACL: 'public-read',
      ContentType: mimeType,
    };
    const created = await this.awsClient.putObject(params).promise();
    if (created) {
      const url = process.env.AWS_S3_URL;
      return `${url}${params.Key}`;
    }
    throw new HttpError(500, 'Não foi possível salvar a imagem na s3');
  };

  deleteAwsStorage = async (media: Media) => {
    const params = {
      Bucket: this.bucket,
      Key: media.getKey(),
    };
    await this.awsClient.deleteObject(params).promise();
  };
}
