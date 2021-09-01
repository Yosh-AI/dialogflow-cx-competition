import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as express from 'express';
import {AppModule} from "./app/app.module";
import {TransformDialogflowResponseInterceptor} from "./app/interceptor/dialogflow-response.interceptor";
import * as bodyParser from "body-parser";

let appInit = false;
const expressServer = express();

const createFunction = async (expressInstance: any): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useGlobalInterceptors(new TransformDialogflowResponseInterceptor());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.init();
  appInit = true;
  app.listen(process.env.PORT || 8080);

};

createFunction(expressServer).then();

