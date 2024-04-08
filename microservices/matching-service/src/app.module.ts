import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchingServicesModule } from './matching-services/matchingservices.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://e0894539:NGJLg8XLeHTECcrj@peerprepcluster.akgyqbp.mongodb.net/?retryWrites=true&w=majority&appName=PeerprepCluster'),
    MatchingServicesModule,
  ],
})
export class AppModule { }
