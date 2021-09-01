export interface DialogflowResponse {
  text?: Array<string>;
  richCard?: any;
  suggestions?: Suggestions;
}

export interface Suggestions {
  suggestions: Array<any>;
  texts: Array<string>;
}
