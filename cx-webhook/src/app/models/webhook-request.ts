export interface WebhookRequest {
  detectIntentResponseId: string;
  intentInfo: IntentInfo;
  pageInfo: PageInfo;
  sessionInfo: SessionInfo;
  fulfillmentInfo: FulfillmentInfo;
  messages?: (MessagesEntity)[] | null;
}

export interface IntentInfo {
  lastMatchedIntent: string;
  displayName: string;
  confidence: number;
}

export interface PageInfo {
  currentPage: string;
  "formInfo": {
    "parameterInfo": Array<FormParameter>
  }
}

export interface FormParameter {
  "displayName": string
  "required": boolean;
  "state": string;//"FILLED",
  "value": string;
  "justCollected": boolean;
}

export interface SessionInfo {
  session: string;
  parameters: any;
}

export interface FulfillmentInfo {
  tag: string;
}

export interface MessagesEntity {
  payload?: any;
  text?: Text;
  responseType: string;
  source: string;
}

export interface Text {
  text?: (string)[] | null;
  redactedText?: (string)[] | null;
}
