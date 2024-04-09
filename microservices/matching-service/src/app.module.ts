import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { MatchingServicesModule } from './matching-services/matchingservices.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://e0894539:NGJLg8XLeHTECcrj@peerprepcluster.akgyqbp.mongodb.net/?retryWrites=true&w=majority&appName=PeerprepCluster'),
    MatchingServicesModule,
    BullModule.forRoot({
      redis: {
        host: 'redis-10885.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 10885,
        password: 'VQ2EDj41UFJUb900AwbyLXx4drrcZSk4',
      },
    }),
  ],
})
export class AppModule {}