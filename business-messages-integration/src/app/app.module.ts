import {HttpModule, Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {ResponseInterceptor} from "./interceptor/response-interceptor";
import {BusinessMessagesController} from "./controllers/business-messages/business-messages.controller";
import {DialogflowService} from "./service/dialogflow/dialogflow.service";
import {BusinessMessagesService} from "./service/business-messages/business-messages.service";
import {FirestoreService} from "./service/firestore/firestore.service";
import {DfResponseConverterFactoryService} from "./service/df-response-converter-factory/df-response-converter-factory.service";
import {DialogflowRequestBuilder} from "./service/dialogflow/dialogflow-request-builder";
import {DfCxResponseConverterService} from "./service/df-cx-response-converter/df-cx-response-converter.service";


@Module({
  imports: [
    HttpModule.register({
      timeout: 10000, //10s
      maxRedirects: 5
    })
  ],
  controllers: [BusinessMessagesController],
  providers: [
    DialogflowService,
    BusinessMessagesService,
    FirestoreService,
    DfCxResponseConverterService,
    DfResponseConverterFactoryService,
    DialogflowRequestBuilder,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {
}
