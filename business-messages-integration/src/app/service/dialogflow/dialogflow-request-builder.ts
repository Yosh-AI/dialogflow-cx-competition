import {Struct, struct} from "pb-util";
import {BusinessMessage} from "../../models/business-message";
import {DFReqBody} from "./model";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DialogflowRequestBuilder {
  session: string;
  queryParams: QueryParams;
  queryInput: QueryInput;

  build(request: BusinessMessage, dfEventName?: string): DFReqBody {
    this.session = request.conversationId;

    if (dfEventName) {
      this.queryInput = {
        event:
          {
            event: dfEventName
          },
        languageCode: request.context.resolvedLocale
      };
      return this;
    }
    this.queryInput = {
      text: {
        text: request.message?.text || request.suggestionResponse?.postbackData,
      },
      languageCode: request.context?.resolvedLocale
    };
    return this;
  }
}

export interface QueryParams {
  payload: Struct;
}

export interface Text {
  text: string;
}

export interface Event {
  event: string;
}

export interface QueryInput {
  text?: Text;
  event?: Event;
  languageCode: string;
}
