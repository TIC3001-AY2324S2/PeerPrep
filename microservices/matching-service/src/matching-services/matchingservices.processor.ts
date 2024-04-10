import { Job } from "bull";
import { Process, Processor } from "@nestjs/bull";

@Processor("process")
export class ProcessConsumer {
  @Process("process")
  handleTranscode(job: Job) {
    console.log("Processing matching service...");
    console.log(job.data);
    console.log("completed!!");
  }
}
