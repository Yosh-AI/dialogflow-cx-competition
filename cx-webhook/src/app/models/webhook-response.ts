import {SessionInfo, WebhookRequest} from "./webhook-request";

export class WebhookResponse {
  //will be deleted by interceptor in response
  private webhookRequest: WebhookRequest;
  private fulfillment_response: FullfilmentResponse = {messages: []};
  //page_info?: any;
  payload: any; //Struct
  private session_info: SessionInfo;
  private target_page?: string;
  private target_flow?: string;

  constructor(webhookRequest: WebhookRequest) {
    this.webhookRequest = webhookRequest;
    this.session_info = webhookRequest.sessionInfo;
  }

  setSessionParameters(parameters: any): WebhookResponse{
    const keys = Object.keys(parameters);
    for (const key of keys) {
      this.session_info.parameters[key] = parameters[key];
    }
    return this;
  }

  getCustomPayload(): Array<any> {
    return this.webhookRequest.messages.filter(e => e?.payload);
  }

  setCustomPayload(_payload: any): WebhookResponse{
    this.payload = _payload;
    return this;
  }

  getSessionParameters(): any {
    return this.session_info.parameters;
  }

  setTargetPage(pageId: string, flowId?: string): WebhookResponse {
    if(flowId) {
      this.target_page = `${this.webhookRequest.pageInfo.currentPage.split('/').slice(0,7).join('/')}/${flowId}/pages/${pageId}`;
    } else {
      this.target_page = `${this.webhookRequest.pageInfo.currentPage.split('/').slice(0,9).join('/')}/${pageId}`
    }
    return this;
  }

  getTargetPage() {
    return this.target_page;
  }

  setTargetFlow(flowId: string): WebhookResponse {
    this.target_flow = `${this.webhookRequest.pageInfo.currentPage.split('/').slice(0,7).join('/')}/${flowId}`;
    return this;
  }

  getTargetFlow() {
    return this.target_flow;
  }

  addFullfilmentResponse(responseMessage: ResponseMessages, mergeBehavior?: MergeBehavior): WebhookResponse {
    this.fulfillment_response.messages.push(responseMessage);
    mergeBehavior && (this.fulfillment_response.merge_behavior = mergeBehavior);
    return this;
  }
}

export interface FullfilmentResponse {
  messages: Array<ResponseMessages>;
  merge_behavior?: MergeBehavior
}

export enum MergeBehavior {
  MERGE_BEHAVIOR_UNSPECIFIED = 'MERGE_BEHAVIOR_UNSPECIFIED', //Not specified. APPEND will be used.
  APPEND = 'APPEND',
  REPLACE = 'REPLACE'
}

export class ResponseMessages {
  text: Text;

  constructor(text: Text) {
    this.text = text;
  }
}

interface Text {
  text: Array<string>; // in docs is array, but df cx take only first element from array
  allow_playback_interruption?: boolean;
}
