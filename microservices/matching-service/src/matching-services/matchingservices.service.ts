import { InjectModel, } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
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
    return matchingServices;
  }

  /**
   * Finds a matching service by its ID.
   * @param matching_service_id - The ID of the matching service to find.
   * @returns A promise that resolves to the found matching service, or null if not found.
   * @throws {HttpException} If no matching service is found, a NotFoundException is thrown.
   * @throws {HttpException} If there is an error during the operation, an internal server error is thrown.
   */
  async findOne(matching_service_id: string): Promise<MatchingService | null> {
    try {
      const foundMatchingService = await this.msModel.findOne({ _id: matching_service_id }).exec();
      if (!foundMatchingService) {
        // If no matching service is found, throw a NotFoundException
        throw new HttpException(`Matching service with ID ${matching_service_id} not found`, HttpStatus.NOT_FOUND);
      }
      return foundMatchingService;
    } catch (error) {
      // If the error is already an HttpException (e.g., from the above if block), rethrow it
      if (error instanceof HttpException) {
        throw error;
      }
      // For other types of errors (e.g., database connection issues), you might want to throw an internal server error or log the error for further investigation
      console.error(`Error finding service with ID ${matching_service_id}:`, error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Updates a matching service.
   * @param matching_service_id - The ID of the matching service to update.
   * @param updateDto - The data for updating the matching service.
   * @returns The updated matching service, or null if not found.
   */
  async update(
    matching_service_id: string,
    updateDto: UpdateMatchingServicesDto,
  ): Promise<MatchingService | null> {
    console.log(`Updating service with ID: ${matching_service_id}`);
    const updatedMatchingService = await this.msModel
      .findOneAndUpdate(
        { _id: matching_service_id },
        { ...updateDto },
        { new: true }
      )
      .exec();
    console.log("Updated service:", updatedMatchingService);
    return updatedMatchingService;
  }

  /**
   * Deletes a matching service.
   * @param matching_service_id - The ID of the matching service to delete.
   * @returns The deleted matching service.
   */
  async delete(matching_service_id: string) { // Assuming ID is passed as a string
    console.log(`Deleting service with ID: ${matching_service_id}`);
    const deletedMatchingService = await this.msModel
      .findOneAndDelete({ _id: matching_service_id }) // Change here
      .exec();
    console.log("Deleted service:", deletedMatchingService);
    return deletedMatchingService;
  }

  /**
   * Deletes all matching services.
   * @returns An object containing the number of deleted matching services.
   */
  async removeAll(): Promise<{ deletedCount: number }> {
    const result = await this.msModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount };
  }

/**
 * Pairs two matching services and processes them with a matched question.
 * @param jobData1 - The data of the first matching service.
 * @param jobData2 - The data of the second matching service.
 * @param question - The matched question object to be associated with the pairing.
 */
  async pairServices(jobData1: any, jobData2: any, question: any): Promise<void> {
    try {

    const collaboration = {
      participants: [jobData1.userId, jobData2.userId],
      questionId: question.id,
    };

    console.log('Collaboration created:', collaboration);

    await this.msModel.deleteMany({
      $or: [
        { _id: jobData1._id },
        { _id: jobData2._id },
      ],
    });

    console.log(`Matching services for ${jobData1._id} and ${jobData2._id} have been paired and removed. Associated with question ${question.id}`);
  } catch (error) {
    console.error('Error pairing services with question:', error);
    throw new Error('Failed to pair matching services with question.');
  }
}


}
