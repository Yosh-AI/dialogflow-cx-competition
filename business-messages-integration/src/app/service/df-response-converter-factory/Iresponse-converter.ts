import {google} from "@google-cloud/dialogflow-cx/build/protos/protos";
import {DialogflowResponse} from "../../models/dialogflow";

export interface IResponseConverter {
  convertToResponse(detectIntentResponse: google.cloud.dialogflow.cx.v3.DetectIntentResponse): DialogflowResponse
}
