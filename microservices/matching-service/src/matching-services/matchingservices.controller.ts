import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMatchingServicesDto } from './dto/create-matching-services.dto';
import { UpdateMatchingServicesDto } from './dto/update-matching-services.dto';
import { MatchingServicesService } from './matchingservices.service';
import { MatchingService } from './schemas/matchingservices.schema';
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

@Controller('matching-services')
export class MatchingServicesController {
  constructor(private readonly matchingServicesService: MatchingServicesService,
    @InjectQueue("process") private readonly msQueue: Queue,
  ) { }

    @Post()
    async create(@Body() createMatchingServicesDto: CreateMatchingServicesDto) {
      try {
        await this.msQueue.add('process', { ...createMatchingServicesDto });
      } catch (error) {
        if (error.message !== 'Job already exists') {
          throw error;
        }
      }
      return this.matchingServicesService.create(createMatchingServicesDto);
    }

    @Get()
    async findAll(): Promise<MatchingService[]> {
      return this.matchingServicesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<MatchingService | null> {
      return this.matchingServicesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDto: UpdateMatchingServicesDto): Promise<MatchingService | null> {
      return this.matchingServicesService.update(id, updateDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.matchingServicesService.delete(id);
    }

    @Delete()
    async deleteAll() {
      return this.matchingServicesService.removeAll();
    }
  }
