export class BusinessMessages {
  private suggestions: Suggestions;
  private richCard: RichCard;


  setSuggestions(_suggestions: Array<Suggestion>, text?: string): this {
    this.suggestions = {text: text, suggestions: _suggestions};
    return this;
  }

  setRichCard(cards: Array<Card>, cardWidth?: string): this {
    this.richCard = {
      carouselCard: {
        cardWidth: 'MEDIUM',
        cardContents: cards.slice(0, 10)
      }
    };
    return this;
  }

}

export interface Suggestions {
  suggestions: Array<Suggestion>;
  text?;
}

export interface Suggestion {
  liveAgentRequest?: {}
  reply?: {
    postbackData: string, text: string;
  }
  action?: {
    "text": string;
    "postbackData": string;
    openUrlAction: {
      url: string;
    }
  }
}

export interface Card {
  title: string;
  description: string;
  suggestions?: Array<Suggestion>;
  media: {
    height: 'MEDIUM';
    contentInfo: {
      fileUrl: string;
      forceRefresh: boolean;
    }
  }
}

export interface RichCard {
  carouselCard: {
    cardWidth: 'MEDIUM',
    cardContents: Array<Card>
  }

}
