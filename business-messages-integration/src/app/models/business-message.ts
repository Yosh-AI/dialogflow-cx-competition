export interface Request {
  message: {
    attributes: {
      agentID: string;
      brandID: string;
    },
    data: string;
    messageId: string;
    publishTime: string;
  },
  subscription;
}

export interface BusinessMessage {
  message?: Message
  context: Context;
  sendTime: string;
  conversationId: string;
  requestId: string;
  suggestionResponse: SuggestionResponse;
  userStatus?: UserStatus;
  agent: string;
}

export interface SuggestionResponse {
  "message": string;
  "postbackData": string;
  "createTime": string;
  "text": string;
  "type"
  "suggestionType": string;
}

export interface Context {
  placeId: string;
  userInfo: UserInfo;
  resolvedLocale: string;
}

export interface UserInfo {
  displayName: string;
  userDeviceLocale: string;
}

export interface UserStatus {
  requestedLiveAgent: boolean;
  statusType?: StatusType;
  isTyping: boolean;
  createTime: string;
}

export interface Message {
  name: string;
  text: string;
  createTime: string;
  messageId: string;
}

export enum StatusType {
  LIVE_AGENT = "LIVE_AGENT",
}

export enum RepresentativeType {
  HUMAN = 'HUMAN',
  BOT = 'BOT'
}
