import {NestFactory} from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as express from 'express';
import {AppModule} from "./app/app.module";
import {ResponseInterceptor} from "./app/interceptor/response-interceptor";
import * as bodyParser from "body-parser";

let appInit = false;
const expressServer = express();

const createFunction = async (expressInstance: any): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.init();
  appInit = true;
  await app.listen(process.env.PORT || 8080);
};

createFunction(expressServer).then().catch(e => console.log(e));

//gcloud auth application-default login --billing-project=ccc-1-f0699
//docker build . -t eu.gcr.io/maps-messaging-experiment/ccc-pl-business-messages-webhook
//docker push eu.gcr.io/maps-messaging-experiment/ccc-pl-business-messages-webhook

