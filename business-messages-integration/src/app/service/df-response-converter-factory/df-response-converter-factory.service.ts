import {Injectable} from '@nestjs/common';
import {google as cx} from "@google-cloud/dialogflow-cx/build/protos/protos";
import {DialogflowResponse} from "../../models/dialogflow";
import {DfCxResponseConverterService} from "../df-cx-response-converter/df-cx-response-converter.service";

@Injectable()
export class DfResponseConverterFactoryService {
  constructor(private dfCxResponseConverterService: DfCxResponseConverterService) {
  }
  
  createResponse(detectIntentResponse: cx.cloud.dialogflow.cx.v3.DetectIntentResponse): DialogflowResponse {
    return this.dfCxResponseConverterService.convertToResponse(detectIntentResponse);
  }
}
