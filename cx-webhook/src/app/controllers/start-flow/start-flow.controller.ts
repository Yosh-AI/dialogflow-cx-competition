import {Body, Controller, Get, Post} from '@nestjs/common';
import {WebhookRequest} from "../../models/webhook-request";
import {WebhookResponse} from "../../models/webhook-response";
import {Articles} from "../../service/articles-rss/articles.service";
import {BusinessMessages, Card} from "../../service/business-messages/business-messages";
import {Article} from "../../models/article";

@Controller('start')
export class StartFlowController {

  constructor(private articles: Articles) {
  }

  @Post('/news')
  async test(@Body() webhookRequest: WebhookRequest): Promise<WebhookResponse> {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);

    const articles: Array<Article> = await this.articles.getRSSArticles();
    const businessMessage = new BusinessMessages();
    const cards: Array<Card> = articles.map(article => {
      return {
        title: article.title,
        description: article.description,
        suggestions: [{
          action: {
            text: "www",
            postbackData: "www",
            openUrlAction: {
              url: article.link
            }
          }
        }],
        media: {
          height: 'MEDIUM',
          contentInfo:
            {fileUrl: article.image, forceRefresh: false}
        }
      }
    });
    businessMessage
      .setRichCard(cards)
      .setSuggestions([{reply: {text: "Vaccination", postbackData: "Vaccination"}}]);
    return webhookResponse.setCustomPayload(businessMessage);
  }

}
