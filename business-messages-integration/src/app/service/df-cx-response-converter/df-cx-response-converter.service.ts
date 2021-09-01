import {Injectable} from '@nestjs/common';
import {google} from "@google-cloud/dialogflow-cx/build/protos/protos";
import {DialogflowResponse, Suggestions} from "../../models/dialogflow";
import {Struct, struct} from "pb-util";
import {IResponseConverter} from "../df-response-converter-factory/Iresponse-converter";

@Injectable()
export class DfCxResponseConverterService implements IResponseConverter{

  convertToResponse(detectIntentResponse: google.cloud.dialogflow.cx.v3.DetectIntentResponse): DialogflowResponse {
    const texts = detectIntentResponse?.queryResult?.responseMessages?.filter(e => e?.text).map(e => e?.text?.text?.join(' '));
    const payloadStruct = detectIntentResponse?.queryResult?.responseMessages?.find(e => e?.payload)?.payload ||
    detectIntentResponse.queryResult.webhookPayloads[0];
    console.log(payloadStruct);
    const suggestions: Suggestions = payloadStruct ? <any>struct.decode(<Struct>payloadStruct)?.suggestions || undefined : undefined;
    const richCard = payloadStruct ? <any>struct.decode(<Struct>payloadStruct)?.richCard || undefined : undefined;
    if (texts?.length >= 2 && suggestions) {
      suggestions['texts'] = [texts[1]]; // suggestion must have text but in DF Response may not contain suggestion text
      const response: DialogflowResponse = {
        text: [texts[0]],
        richCard: richCard,
        suggestions: suggestions
      };
      return response;
    }
    if (texts?.length === 1 && suggestions) {
      suggestions['texts'] = [texts[0]];
      const response: DialogflowResponse = {
        text: undefined,
        richCard: richCard,
        suggestions: suggestions
      };
      return response;
    }
    if (suggestions && suggestions.texts) {
      suggestions['texts'] = [texts[0]];
      const response: DialogflowResponse = {
        text: undefined,
        richCard: richCard,
        suggestions: suggestions
      };
      return response;
    }
    if (texts?.length) {
      const response: DialogflowResponse = {
        text: texts,
        richCard: richCard,
        suggestions: suggestions
      };
      return response;
    }
    return null;
  }
}
