import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import 'dotenv/config';

import sentryConfig from './config/sentry';
import routes from './routes';

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

    this.app.use('/', routes);

    this.app.use(Sentry.Handlers.errorHandler());
  }

  public start(PORT: number): void {
    this.app.listen(PORT);
  }
}

//TODO -> Validar entrada de dados e suas consistência, por exemplo, validar se a data é valida, e essas coisas

//TODO -> Adicionar validação de id na listagem única e criar middleware de validação para listagens múltiplas

//TODO -> Verificar se todas as listagens de múltiplos dados estão dentro de um array de data

//TODO -> Verificar quais tabelas podem ser listadas em ordem DESC

//TODO -> Melhorar os retornos de métodos GET com relacionamento (evitando encadeamento de objetos)
