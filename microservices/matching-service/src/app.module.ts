import { Module } from '@nestjs/common';
import { MatchingServicesModule } from './matching-services/matchingservices.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, MatchingServicesModule],
})
export class AppModule { }
