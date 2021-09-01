import {HttpModule, Module} from '@nestjs/common';
import {StartFlowController} from "./controllers/start-flow/start-flow.controller";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {TransformDialogflowResponseInterceptor} from "./interceptor/dialogflow-response.interceptor";
import {Articles} from "./service/articles-rss/articles.service";
import {RegistrationFlowController} from "./controllers/registration-flow/registration-flow.controller";
import {SheetsService} from "./service/sheets/sheets.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 7000, //7s
      maxRedirects: 5,
    }),
  ],
  controllers: [StartFlowController,  RegistrationFlowController],
  providers: [Articles, SheetsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformDialogflowResponseInterceptor,
    }],
})
export class AppModule {
}
