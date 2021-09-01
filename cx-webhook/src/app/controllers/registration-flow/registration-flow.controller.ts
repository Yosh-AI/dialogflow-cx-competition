import {Body, Controller, Post} from '@nestjs/common';
import {WebhookRequest} from "../../models/webhook-request";
import {MergeBehavior, WebhookResponse} from "../../models/webhook-response";
import {SheetsService} from "../../service/sheets/sheets.service";
import {SPREADSHEET_ID} from "../../../env";

const dayjs = require('dayjs');

@Controller('registration-flow')
export class RegistrationFlowController {

  constructor(private sheetsService: SheetsService) {
  }

  @Post('/get-email')
  async email(@Body() webhookRequest: WebhookRequest): Promise<WebhookResponse> {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    const userEmail = webhookResponse.getSessionParameters().email;
    const users: Array<{ email, zip_code, id }> = <Array<{ email, zip_code, id }>>await this.sheetsService.getRows(SPREADSHEET_ID, 0);
    const findedUser: { email, zip_code, id } = users.find(e => e.email === userEmail);
    if (findedUser) {
      return webhookResponse
        .setTargetPage("619e98a3-d4d9-4dd2-87c8-1cad2c49b65e"); //get_zip_code
    }
    return webhookResponse.setTargetPage("ee8182e3-a111-4342-a25d-ced16349e43d"); //get_social_security
  }

  @Post('/get-social-security')
  async securityNumber(@Body() webhookRequest: WebhookRequest): Promise<WebhookResponse> {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    const socialSecurityNumber = webhookResponse.getSessionParameters().social_security;
    const users: Array<{ email, zip_code, id }> = <Array<{ email, zip_code, id }>>await this.sheetsService.getRows(SPREADSHEET_ID, 0);
    const findedUser: { email, zip_code, id } = users.find(e => e.id.endsWith(socialSecurityNumber));
    if (!findedUser) {
      return webhookResponse
        .setTargetPage("73d57bd5-37c0-4947-b405-5939f9c8a52d"); //wrong_social_security
    }
    return webhookResponse;
  }

  @Post('/date-selection')
  async dateSelection(@Body() webhookRequest: WebhookRequest) {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    const userDate: { year, month, day } = webhookResponse.getSessionParameters().date;
    const isLaterDateThanNow = dayjs().isBefore(`${userDate.year}-${userDate.month}-${userDate.day}`, 'day');
    if (isLaterDateThanNow) {
      const calendar: Array<{ date, morning, afternoon }> = await this.sheetsService.getRows(SPREADSHEET_ID, 1);
      const freeDate = calendar.find(e => dayjs(e.date).isSame(`${userDate.year}-${userDate.month}-${userDate.day}`) && (e.morning == undefined|| e.afternoon == undefined));
      if(freeDate) {
        return webhookResponse
          .setTargetPage("66487203-6779-494c-af39-0c8fb2e7665b"); // time selection
      } else {
        return webhookResponse
          .setTargetPage("674cef66-c8f2-4f47-ac02-217ee66ddb48") // date selection
          .setSessionParameters({date: ""})
          .addFullfilmentResponse({text: {text: ["Please select another date."]}},MergeBehavior.REPLACE);
         }
    } else {
      return webhookResponse
        .setTargetPage("674cef66-c8f2-4f47-ac02-217ee66ddb48") // date selection
        .setSessionParameters({date: ""})
        .addFullfilmentResponse({text: {text: ["Please write a valid date."]}},MergeBehavior.REPLACE);
    }
  }

  @Post('/date-selection-again')
  async dateSelectionAgain(@Body() webhookRequest: WebhookRequest) {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    const userDate: { year, month, day } = webhookResponse.getSessionParameters().date;
    const isLaterDateThanNow = dayjs().isBefore(`${userDate.year}-${userDate.month}-${userDate.day}`, 'day');
    if (isLaterDateThanNow) {
      const calendar: Array<{ date, morning, afternoon }> = await this.sheetsService.getRows(SPREADSHEET_ID, 1);

      const freeDate = calendar.find(e => dayjs(e.date).isSame(`${userDate.year}-${userDate.month}-${userDate.day}`) && (e.morning == undefined || e.afternoon == undefined));
      if(freeDate) {
        return webhookResponse
          .setTargetPage("66487203-6779-494c-af39-0c8fb2e7665b"); // time_selection
      } else {
        return webhookResponse
          .setTargetPage("674cef66-c8f2-4f47-ac02-217ee66ddb48") // date_selection
          .setSessionParameters({date: ""})
          .addFullfilmentResponse({text: {text: ["Please select another date."]}},MergeBehavior.REPLACE);
      }
    } else {
      return webhookResponse
        .setTargetPage("674cef66-c8f2-4f47-ac02-217ee66ddb48") // date_selection
        .setSessionParameters({date: ""})
        .addFullfilmentResponse({text: {text: ["Please write a valid date."]}}, MergeBehavior.REPLACE);
    }
  }

  @Post('/date-selection-again-confirmation')
  async dateSelectionAgainConfirmation(@Body() webhookRequest: WebhookRequest) {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    return webhookResponse.setSessionParameters({time: webhookResponse.getSessionParameters().time_2});
  }

  @Post('/time-selection')
  async timeSelection(@Body() webhookRequest: WebhookRequest) {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    const userDate: { year, month, day } = webhookResponse.getSessionParameters().date;
    const userTime: "morning" | "afternoon" = webhookResponse.getSessionParameters().time;
    const isLaterDateThanNow = dayjs().isBefore(`${userDate.year}-${userDate.month}-${userDate.day}`, 'day');
    if (isLaterDateThanNow) {
      const calendar: Array<{ date, morning, afternoon }> = await this.sheetsService.getRows(SPREADSHEET_ID, 1);
      const findedDate = calendar.find(e => dayjs(e.date).isSame(`${userDate.year}-${userDate.month}-${userDate.day}`) && (e.morning == undefined || e.afternoon == undefined));
      if (findedDate) {//date with minimum one available time
        let available = [];
        findedDate.morning == undefined && available.push("morning");
        findedDate.afternoon == undefined && available.push("afternoon");
        if (available.includes(userTime)) {
          return webhookResponse;
        } else {
          return webhookResponse
            .setSessionParameters({time_2: available[0]})
            .setTargetPage("724169c8-7b0c-40b4-80b6-2048d9e5cf72") // date_selection_again
            .addFullfilmentResponse({text: {text: [`Only ${available[0]} is available, confirm or select another date.`]}}, MergeBehavior.REPLACE);
        }
      }

      return webhookResponse.setTargetPage("16c4d5b6-e7d3-4c3e-8000-bdb513785a14"); //all_dates_taken
    } else {
      return webhookResponse
        .setTargetPage("674cef66-c8f2-4f47-ac02-217ee66ddb48") // date selection
        .setSessionParameters({date: ""})
        .addFullfilmentResponse({text: {text: ["Please write a valid date."]}}, MergeBehavior.REPLACE);
    }
  }

  @Post('/registration-summary/confirmation')
  async registrationConfirmation(@Body() webhookRequest: WebhookRequest) {
    const webhookResponse: WebhookResponse = new WebhookResponse(webhookRequest);
    const email: string = webhookResponse.getSessionParameters().email;
    const time: 'morning' | 'afternoon' = webhookResponse.getSessionParameters().time;
    const userDate: { year, month, day } = webhookResponse.getSessionParameters().date;
    const zipCode: string = webhookResponse.getSessionParameters()['zip-code'];
    const vaccine: string = webhookResponse.getSessionParameters().vaccine_choosen;

    await this.sheetsService.insertRows([{
      email: email,
      zip_code: zipCode,
      time: time,
      date: `${userDate.year}-${userDate.month}-${userDate.day}`,
      vaccine_choosen: vaccine
    }], SPREADSHEET_ID, 2);

  }

}
