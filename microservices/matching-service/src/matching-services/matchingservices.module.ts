import { Module } from '@nestjs/common';
import { MatchingServiceController } from './matchingservices.controller';
import { MatchingServicesService } from './matchingservices.service';
import { MatchingService, MatchingServicesSchema } from './schemas/matchingservices.schema';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: MatchingService.name,
        useFactory: async (connection: Connection) => {
          const schema = MatchingServicesSchema;
          const AutoIncrement = require('mongoose-sequence')(connection);
          schema.plugin(AutoIncrement, { inc_field: 'matching_service_id' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    BullModule.registerQueue({
      name: 'matching-service',
    }),
  ],
  controllers: [MatchingServiceController],
  providers: [MatchingServicesService],
})
export class MatchingServicesModule { }
