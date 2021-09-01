import {Injectable} from '@nestjs/common';
import {GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY} from "../../../env";

const {GoogleSpreadsheet} = require('google-spreadsheet');
require('dotenv').config();

@Injectable()
export class SheetsService {


  constructor() {
  }

  async getRows(spreadsheetId: string, sheetIndex: number): Promise<any> {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[sheetIndex];
    const rows = await sheet.getRows();
    return rows;
  }

  async insertRows(data: Array<any>, spreadsheetId: string, sheetIndex: number): Promise<any> {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[sheetIndex];
    await sheet.addRows(data);
  }

}
