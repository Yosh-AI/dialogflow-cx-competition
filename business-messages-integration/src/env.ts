import * as credentials from './credentials.json'

require('dotenv').config();

export const env = {
 CREDENTIALS: credentials,
  PROJECT_ID: process.env['PROJECT_ID'],
  DF_CX_AGENT_ID: process.env.DF_CX_AGENT_ID,
  DF_CX_ENVIROMENT: process.env.DF_CX_ENVIROMENT,
  TALK_WITH_HUMAN_DF_EVENT: 'BM_HANDOVER',
  MEDIA_DF_EVENT: 'BM_MEDIA',
};
