import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { MatchingServicesService } from "./matchingservices.service";
import { CreateMatchingServicesDto } from "./dto/create-matching-services.dto";
import { UpdateMatchingServicesDto } from "./dto/update-matching-services.dto";
import { MatchingService } from "./schemas/matchingservices.schema";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Controller("matching-service")
export class MatchingServiceController {
  constructor(
    private readonly matchingservice: MatchingServicesService,
    @InjectQueue("process") private readonly msQueue: Queue,
  ) {}

  /**
   * Create a new matching service.
   * @param CreateMatchingServiceDto - The data for creating a matching service.
   * @returns The created matching service.
   */
  @Post()
  async create(@Body() CreateMatchingServiceDto: CreateMatchingServicesDto) {
    await this.msQueue.add("process", { data: CreateMatchingServiceDto });
    return this.matchingservice.create(CreateMatchingServiceDto);
  }

  /**
   * Get all matching services.
   * @returns A promise that resolves to an array of matching services.
   */
  @Get()
  async findAll(): Promise<MatchingService[]> {
    return this.matchingservice.findAll();
  }

  /**
   * Get a matching service by ID.
   * @param id - The ID of the matching service.
   * @returns A promise that resolves to the matching service, or null if not found.
   */
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<MatchingService | null> {
    return this.matchingservice.findOne(id);
  }

  /**
   * Update a matching service by ID.
   * @param id - The ID of the matching service to update.
   * @param updateMatchingServiceDto - The data for updating the matching service.
   * @returns A promise that resolves to the updated matching service, or null if not found.
   */
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateDto: UpdateMatchingServicesDto,
  ): Promise<MatchingService | null> {
    return this.matchingservice.update(id, updateDto);
  }

  /**
   * Delete a matching service by ID.
   * @param id - The ID of the matching service to delete.
   */
  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.matchingservice.delete(id);
  }
}
