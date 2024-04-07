import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MatchingServicesService } from "./matchingservices.service";
import { CreateMatchingServicesDto } from "./dto/create-matching-services.dto";
import { UpdateMatchingServicesDto } from "./dto/update-matching-services.dto";
import { MatchingService } from './schemas/matchingservices.schema';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller("matching-service")
export class MatchingServiceController {
  constructor(private readonly matchingService: MatchingServicesService,
    @InjectQueue('matching-service') private readonly msQueue: Queue) { }

  @Post()
  async create(@Body() CreateMatchingServiceDto: CreateMatchingServicesDto) {
    const newMatchingService = await this.matchingService.create(CreateMatchingServiceDto);
    await this.msQueue.add('process', newMatchingService,
      { attempts: 3, backoff: 1000, removeOnComplete: true });
    return newMatchingService;
  }

  /**
   * Get all matching services.
   * @returns A promise that resolves to an array of matching services.
   */
  @Get()
  async findAll(): Promise<MatchingService[]> {
    return this.matchingService.findAll();
  }

  @Get('queue')
  async getJobs() {
    const jobs = await this.msQueue.getJobs(['active', 'completed', 'failed', 'delayed', 'waiting', 'paused']);
    return jobs.map(job => job.data);
  }

  /**
   * Get a matching service by ID.
   * @param id - The ID of the matching service.
   * @returns A promise that resolves to the matching service, or null if not found.
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MatchingService | null> {
    return this.matchingService.findOne(id);
  }


  /**
   * Update a matching service by ID.
   * @param id - The ID of the matching service to update.
   * @param updateMatchingServiceDto - The data for updating the matching service.
   * @returns A promise that resolves to the updated matching service, or null if not found.
   */
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateMatchingServicesDto): Promise<MatchingService | null> {
    return this.matchingService.update(id, updateDto);
  }

  /**
   * Delete a matching service by ID.
   * @param id - The ID of the matching service to delete.
   */
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.matchingService.delete(id);
  }
}
