declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: string;
      readonly APP_PORT: number;
      readonly APP_KEY: string;
      readonly DB_DIALECT: string;
      readonly DB_HOST: string;
      readonly DB_PORT: number;
      readonly DB_USERNAME: string;
      readonly DB_PASSWORD: string;
      readonly DB_DATABASE: string;
      readonly REDIS_HOST: string;
      readonly REDIS_PASSWORD: string;
      readonly REDIS_PORT: number;
      readonly SENTRY_DSN: string;
      readonly SENTRY_ENV: string;
      readonly DISK: string;
      readonly STORAGE_URL: string;
      readonly AWS_S3_URL: string;
      readonly AWS_S3_ACCESS_KEY_ID: string;
      readonly AWS_S3_SECRET_ACCESS_KEY: string;
      readonly AWS_S3_BUCKET_NAME: string;
      readonly AWS_S3_REGION: string;
      readonly AZURE_STORAGE_CONNECTION_STRING: string;
      readonly AZURE_CONTAINER_NAME: string;
      readonly EMAIL_PASS: string;
      readonly EMAIL_USER: string;
      readonly EMAIL_PORT: string;
      readonly EMAIL_HOST: string;
      readonly RPM_API_KEY: string;
    }
  }
}
