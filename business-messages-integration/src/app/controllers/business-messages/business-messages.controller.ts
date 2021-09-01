import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {BusinessMessage, RepresentativeType, Request, StatusType} from "../../models/business-message";
import {DialogflowRequestBuilder} from "../../service/dialogflow/dialogflow-request-builder";
import {DialogflowService} from "../../service/dialogflow/dialogflow.service";
import {DialogflowResponse} from "../../models/dialogflow";
import {env} from "../../../env";
import {DfResponseConverterFactoryService} from "../../service/df-response-converter-factory/df-response-converter-factory.service";
import {BusinessMessagesService} from "../../service/business-messages/business-messages.service";
import {DFReqBody} from "../../service/dialogflow/model";

@Controller('/')
export class BusinessMessagesController {
  constructor(private dialogflowService: DialogflowService,
              private responseConverterFactoryService: DfResponseConverterFactoryService,
              private businessMessagesService: BusinessMessagesService,
              private dialogflowRequestBuilder: DialogflowRequestBuilder
  ) {
  }

  @HttpCode(200)
  @Post('/message')
  async message(@Body() request: Request) {
    const messageRequest: BusinessMessage = JSON.parse(Buffer.from(request.message.data, 'base64').toString());

    if (messageRequest?.userStatus?.statusType === StatusType.LIVE_AGENT) { // user requested live agent
      return this.liveAgentRequest(messageRequest);
    }
    if (!messageRequest.message && !messageRequest.suggestionResponse) { // if no message, typing events etc.
      return;
    }
    if (messageRequest.suggestionResponse?.type === "ACTION") { //user click on action suggestion, bm send additional event about that
      return;
    }

    if (messageRequest?.message?.text?.startsWith('https://storage.googleapis.com')) {
      return this.media(messageRequest);
    }
    const DFBody = await this.dialogflowRequestBuilder.build(messageRequest);
    const detectIntentResponse = await this.dialogflowService.detectIntent(DFBody);
    const response: DialogflowResponse = this.responseConverterFactoryService.createResponse(detectIntentResponse);

    await this.sendBMResponse(messageRequest, response);
    return;
  }

  private async liveAgentRequest(messageRequest: BusinessMessage) {

    const dfBody = await this.dialogflowRequestBuilder.build(messageRequest, env.TALK_WITH_HUMAN_DF_EVENT);
    const detectIntentResponse = await this.dialogflowService.detectIntent(dfBody);
    const response: DialogflowResponse = this.responseConverterFactoryService.createResponse(detectIntentResponse);
    await this.sendBMResponse(messageRequest, response);
    return;
  }

  private async sendBMResponse(messageRequest: BusinessMessage, response: DialogflowResponse): Promise<void> {
    await this.businessMessagesService.auth();

    if (response?.text?.length && response?.suggestions?.texts) { // if text + suggestions + other
      for (const resp of response?.text || []) {
        await this.businessMessagesService.sendTextMessage(messageRequest.conversationId, resp, RepresentativeType.BOT);
      }
      response.richCard && await this.businessMessagesService.sendCarouselMessage(messageRequest.conversationId, response.richCard, RepresentativeType.BOT);
      await this.businessMessagesService.sendSuggestionsMessage(messageRequest.conversationId, response.suggestions, RepresentativeType.BOT);
      return;
    }
    for (const resp of response?.text || []) { //if text + other
      await this.businessMessagesService.sendTextMessage(messageRequest.conversationId, resp, RepresentativeType.BOT);
    }
    response?.richCard && await this.businessMessagesService.sendCarouselMessage(messageRequest.conversationId, response.richCard, RepresentativeType.BOT);
    response?.suggestions?.texts?.length && await this.businessMessagesService.sendSuggestionsMessage(messageRequest.conversationId, response.suggestions, RepresentativeType.BOT);
  }

  private async media(messageRequest: BusinessMessage) {
    await this.businessMessagesService.auth();
    const dfBody: DFReqBody = this.dialogflowRequestBuilder.build(messageRequest, env.MEDIA_DF_EVENT);
    const detectIntentResponse = await this.dialogflowService.detectIntent(dfBody);
    const response: DialogflowResponse = this.responseConverterFactoryService.createResponse(detectIntentResponse);
    await this.sendBMResponse(messageRequest, response);
    return;
  }
}
