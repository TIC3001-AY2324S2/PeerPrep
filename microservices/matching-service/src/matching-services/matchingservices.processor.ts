import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('matching-service')
export class MatchingServiceProcessor {
  private readonly logger = new Logger(MatchingServiceProcessor.name);

  @Process('pairing')
  pairMatchingServiceRequest(job: Job) {
    this.logger.debug('Start pairing...');

    this.logger.debug('pairing completed');
  }
}
