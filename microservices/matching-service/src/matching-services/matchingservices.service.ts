import { Injectable } from '@nestjs/common';
import { MatchingServices } from './Interface/matching-service.interface';

@Injectable()
export class MatchingServicesService {
  private readonly matching_services: MatchingServices[] = [];

  create(matching_service: MatchingServices) {
    this.matching_services.push(matching_service);
  }

  findAll(): MatchingServices[] {
    return this.matching_services;
  }
}
