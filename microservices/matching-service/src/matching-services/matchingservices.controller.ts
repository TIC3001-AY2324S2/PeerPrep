import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { MatchingServicesService } from './matchingservices.service';
import { MatchingServices } from './Interface/matching-service.interface';
import { CreateMatchingServicesDto } from './dto/create-matching-services.dto';

@UseGuards(RolesGuard)
@Controller('matching-service')
export class MatchingServiceController {
  constructor(private readonly matchingservice: MatchingServicesService) { }

  @Post()
  @Roles(['admin'])
  async create(@Body() CreateMatchingServiceDto: CreateMatchingServicesDto) {
    this.matchingservice.create(CreateMatchingServiceDto);
  }

  @Get()
  async findAll(): Promise<MatchingServices[]> {
    return this.matchingservice.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    // get by ID logic
  }
}
