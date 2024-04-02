import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchingServiceController } from './matchingservices.controller';
import { MatchingServicesService } from './matchingservices.service';
import { MatchingService, MatchingServicesSchema } from './schemas/matchingservices.schema';

/**
 * Module for managing matching services.
 */
@Module({
  imports: [MongooseModule.forFeature([{ name: MatchingService.name, schema: MatchingServicesSchema }])],
  controllers: [MatchingServiceController],
  providers: [MatchingServicesService],
})
export class MatchingServicesModule { }
