import * as cuid from 'cuid';

import { Campaign, DatabaseService, CampaignService } from '../types';
import * as campaignSchemas from './schema/campaign'
import { validate } from './schema/validator';
import DynamoDB from '../lib/dynamo';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

export function campaignService(cuid: () => string, DatabaseService: DatabaseService): CampaignService {
  return {
    save(campaign: Campaign) {
      campaign.id = cuid();
      const {error, value} = validate(campaign, campaignSchemas.schema());
      if (error) {
        throw new Error(`Validation error: ${error}`);
      }

      const params: PutItemInput = {
        TableName: process.env.CAMPAIGN_TABLE,
        Item: value
      }

      return DatabaseService.put(params);
    },
    async edit(id: string, campaign: Campaign) {
      throw new Error('[500] Method not implemented')
    },
    async get(id: string) {
      throw new Error('[500] Method not implemented')
    },
    async list(userId: string) {
      throw new Error('[500] Method not implemented')
    },
  }
}

export default campaignService(cuid, DynamoDB);