// import { Test } from "@nestjs/testing";
// import { MatchingServiceController } from "./matchingservices.controller";
// import { MatchingServicesService } from "./matchingservices.service";
// import { MatchingServices } from "./Interface/matching-service.interface";

// describe("MatchingServiceController", () => {
//   let matchingserviceController: MatchingServiceController;
//   let matchingService: MatchingServicesService;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [MatchingServiceController],
//       providers: [MatchingServicesService],
//     }).compile();

//     matchingService = moduleRef.get<MatchingServicesService>(
//       MatchingServicesService,
//     );
//     matchingserviceController = moduleRef.get<MatchingServiceController>(
//       MatchingServiceController,
//     );
//   });

//   describe("findAll", () => {
//     it("should return an array of matching service", async () => {
//       const result: MatchingServices[] = [
//         {
//           matching_service_id: 1,
//           email: "test1@example.com",
//           difficulty: "easy",
//           category: "sorting",
//           expired_at: new Date("2022-12-31"),
//           status: "active",
//           created_at: new Date("2022-01-01"),
//           modified_at: new Date("2022-01-02"),
//         },
//       ];
//       jest.spyOn(matchingService, "findAll").mockImplementation(() => result);

//       expect(await matchingserviceController.findAll()).toBe(result);
//     });
//   });
// });
