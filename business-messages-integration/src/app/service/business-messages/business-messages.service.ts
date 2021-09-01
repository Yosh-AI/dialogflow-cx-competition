import {HttpService, Injectable} from '@nestjs/common';
import {RepresentativeType} from "../../models/business-message";
import {v4 as uuidv4} from 'uuid';
import {env} from "../../../env";
import {Credentials} from "google-auth-library";
import {Suggestions} from "../../models/dialogflow";

const businessmessages = require('businessmessages');

const {google} = require('googleapis');

@Injectable()
export class BusinessMessagesService {
  private token: string;

  constructor(private httpService: HttpService) {
  }

  async auth(): Promise<void> {
    // Initialize the Business Messages API
    const bmApi = new businessmessages.businessmessages_v1.Businessmessages({});

    // Set the scope that we need for the Business Messages API
    const scopes = [
      'https://www.googleapis.com/auth/businessmessages'
    ];

    // Set the private key to the service account file
    const serviceAccountEnv = env.CREDENTIALS;

    // configure a JWT auth client
    const authClient = new google.auth.JWT(
      serviceAccountEnv.client_email,
      null,
      serviceAccountEnv.private_key,
      scopes
    );
    this.token = await new Promise(function (resolve, reject) {
      // authenticate request
      authClient.authorize(function (err, tokens: Credentials) {
        if (err) {
          reject(false);
        } else {
          resolve(tokens.access_token);
        }
      });
    });
  }

  /**
   * Posts a message to the Business Messages API.
   *
   * @param {string} conversationId The unique id for this user and agent.
   * @param {string} text The message text to send the user.
   * @param {string} representativeType A value of BOT or HUMAN.
   */
  async sendTextMessage(conversationId: string, text: string, representativeType: RepresentativeType): Promise<void> {
    const uuid = uuidv4().toString();
    const body = {
      "name": `conversations/${conversationId}/messages/${uuid}`,
      "messageId": uuid,
      "representative": {
        "representativeType": representativeType
      },
      text: text
    };

    try {
      await this.httpService
        .post(`https://businessmessages.googleapis.com/v1/conversations/${conversationId}/messages`, body, {headers: {Authorization: `Bearer ${this.token}`}})
        .toPromise();
    } catch (e) {
      console.error(JSON.stringify(e?.response?.data))
    }
  }

  async sendImageMessage(conversationId: string, imageUrl: string, representativeType: RepresentativeType): Promise<void> {
    const uuid = uuidv4().toString();
    const body = {
      "name": `conversations/${conversationId}/messages/${uuid}`,
      "messageId": uuid,
      "representative": {
        "representativeType": representativeType
      },
      "contentInfo": {
        "fileUrl": imageUrl,
        "forceRefresh": false,
        "altText": "image"
      }
    };

    try {
      await this.httpService
        .post(`https://businessmessages.googleapis.com/v1/conversations/${conversationId}/messages`, body, {headers: {Authorization: `Bearer ${this.token}`}})
        .toPromise();
    } catch (e) {
      console.error(JSON.stringify(e?.response?.data))
    }
  }

  async sendSuggestionsMessage(conversationId: string, suggestions: Suggestions, representativeType: RepresentativeType): Promise<void> {
    if (suggestions.texts.length > 1) {
      for (const text of suggestions.texts.slice(0, suggestions.texts.length - 1)) { // every text except last
        await this.sendTextMessage(conversationId, text, RepresentativeType.BOT);
      }
    }

    const uuid = uuidv4().toString();
    const body = {
      "name": `conversations/${conversationId}/messages/${uuid}`,
      "messageId": uuid,
      "representative": {
        "representativeType": representativeType
      },
      text: suggestions.texts[suggestions.texts.length - 1], // last elements of array
      suggestions: suggestions.suggestions
    };
    try {
      await this.httpService
        .post(`https://businessmessages.googleapis.com/v1/conversations/${conversationId}/messages`, body, {headers: {Authorization: `Bearer ${this.token}`}})
        .toPromise();
    } catch (e) {
      console.error(JSON.stringify(e?.response?.data))
    }
  }

  async sendCarouselMessage(conversationId: string, carousel, representativeType: RepresentativeType): Promise<void> {
    const uuid = uuidv4().toString();
    const body = {
      "name": `conversations/${conversationId}/messages/${uuid}`,
      "messageId": uuid,
      "representative": {
        "representativeType": representativeType
      },
      richCard: carousel
    };
    try {
      await this.httpService
        .post(`https://businessmessages.googleapis.com/v1/conversations/${conversationId}/messages`, body, {headers: {Authorization: `Bearer ${this.token}`}})
        .toPromise();
    } catch (e) {
      console.error(JSON.stringify(e?.response?.data))
    }
  }

  async sendHumanLeftConvEvent(conversationId: string, userName: string) {
    const body = {
      'eventType': 'REPRESENTATIVE_LEFT',
      'representative': {
        'displayName': userName,
        'representativeType': RepresentativeType.HUMAN
      }
    };
    try {
      const {data} = await this.httpService.post(`https://businessmessages.googleapis.com/v1/conversations/${conversationId}/events?eventId=${uuidv4()}`
        , body,
        {headers: {'Authorization': `Bearer ${this.token}`}}).toPromise();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}
