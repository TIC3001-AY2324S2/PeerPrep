import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MatchingService } from "./schemas/matchingservices.schema";
import { CreateMatchingServicesDto } from "./dto/create-matching-services.dto";
import { UpdateMatchingServicesDto } from "./dto/update-matching-services.dto";

@Injectable()
export class MatchingServicesService {
  constructor(
    @InjectModel(MatchingService.name)
    private readonly msModel: Model<MatchingService>,
  ) {}

  /**
   * Creates a new matching service.
   * @param createMatchingServicesDto - The data for creating the matching service.
   * @returns The created matching service.
   */
  async create(
    createMatchingServicesDto: CreateMatchingServicesDto,
  ): Promise<MatchingService> {
    const createdMatchingService = await this.msModel.create(
      createMatchingServicesDto,
    );
    console.log("Matching service created:", createdMatchingService);
    return createdMatchingService;
  }

  /**
   * Retrieves all matching services.
   * @returns An array of matching services.
   */
  async findAll(): Promise<MatchingService[]> {
    console.log("Finding all matching services");
    const matchingServices = await this.msModel.find().exec();
    console.log("Total number of matching services:", matchingServices.length);
    return this.msModel.find().exec();
  }

  /**
   * Retrieves a matching service by its ID.
   * @param matching_service_id - The ID of the matching service to retrieve.
   * @returns The matching service with the specified ID, or null if not found.
   */
  async findOne(matching_service_id: number): Promise<MatchingService | null> {
    console.log(`Finding service with ID: ${matching_service_id}`);
    const foundMatchingService = this.msModel
      .findOne({ matching_service_id })
      .exec();
    console.log("Found service:", foundMatchingService);
    return foundMatchingService;
  }

  /**
   * Updates a matching service by its ID.
   * @param matching_service_id - The ID of the matching service to update.
   * @param matching_service - The updated matching service data.
   * @returns The updated matching service, or null if not found.
   */
  async update(
    matching_service_id: number,
    updateDto: UpdateMatchingServicesDto,
  ): Promise<MatchingService | null> {
    console.log(`Updating service with ID: ${matching_service_id}`);
    const UpdateMatchingService = this.msModel
      .findOneAndUpdate(
        { matching_service_id },
        { ...updateDto, modified_at: Date.now() + 8 * 60 * 60 * 1000 },
        { new: true },
      )
      .exec();
    console.log("Update service:", UpdateMatchingService);
    return UpdateMatchingService;
  }

  /**
   * Deletes a matching service by its ID.
   * @param matching_service_id - The ID of the matching service to delete.
   * @returns The deleted matching service.
   */
  async delete(matching_service_id: number) {
    console.log(`Deleting service with ID: ${matching_service_id}`);
    const deletedMatchingService = await this.msModel
      .findOneAndDelete({ matching_service_id })
      .exec();
    return deletedMatchingService;
  }
}
