import {Injectable} from '@nestjs/common';
import {SessionsClient as CXSessionClient} from '@google-cloud/dialogflow-cx';
import {env} from "../../../env";
import {google as cx} from "@google-cloud/dialogflow-cx/build/protos/protos";
import {DFReqBody} from "./model";

require('dotenv').config();

@Injectable()
export class DialogflowService {

  async detectIntent(body: DFReqBody): Promise<cx.cloud.dialogflow.cx.v3.DetectIntentResponse> {
    const sessionClient = new CXSessionClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'});
    const sessionPath = `projects/${env.PROJECT_ID}/locations/us-central1/agents/${env.DF_CX_AGENT_ID}/environments/${env.DF_CX_ENVIROMENT}/sessions/${body.session}`;
    const request = {
      session: sessionPath,
      queryInput: body.queryInput
    };
    const detectIntent = async (): Promise<cx.cloud.dialogflow.cx.v3.DetectIntentResponse> => {
      try {
        // @ts-ignore
        const [response]: cx.cloud.dialogflow.cx.v3.DetectIntentResponse = await sessionClient.detectIntent(request);
        return response;
      } catch (e) {
        console.error(e);
        return null;
      }
    };
    return detectIntent();
  }
}

