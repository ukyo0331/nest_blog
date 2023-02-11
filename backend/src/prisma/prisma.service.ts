import { Injectable } from '@nestjs/common';
import { ConfigService} from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { SSM } from 'aws-sdk';

const ssm = new SSM();
process.env.AWS_SDK_LOAD_CONFIG = 'true';
process.env.AWS_PROFILE = 'default';
async function getParameter(name: string) {
  const params = {
    Name: name,
  };
  const data = await ssm.getParameter(params).promise();
  return data.Parameter.Value;
}
async function getParameterFromSSM() {
  return await getParameter('database_id');
}
const parameter = getParameterFromSSM();

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: ConfigService) {
    super({
      datasources: {
        db: {
          url: parameter.toString(),
        },
      },
    });
  }
}
