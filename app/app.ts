import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
import cors from 'cors';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setup();
    Sentry.init(sentryConfig);
  }

  private setup(): void {
    this.app.use(cors());
    this.app.use(
      fileUpload({
        tempFileDir: '/tmp/',
        safeFileNames: /\\/g,
        preserveExtension: 4,
        limits: { fileSize: 50 * 1024 * 1024 },
        abortOnLimit: true,
      }),
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(Sentry.Handlers.requestHandler());

    
    // Test route
    this.app.post('/ping', (req, res) => {
      return res.status(200).json('pong');
    });

    this.app.use(Sentry.Handlers.errorHandler());
  }

  public start(PORT: number): void {
    this.app.listen(PORT);
  }
}
