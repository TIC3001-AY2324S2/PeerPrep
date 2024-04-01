import { Module } from "@nestjs/common";
import { MatchingServiceController } from "./matchingservices.controller";
import { MatchingServicesService } from "./matchingservices.service";

@Module({
  imports: [],
  controllers: [MatchingServiceController],
  providers: [MatchingServicesService],
})
export class MatchingServicesModule { }
