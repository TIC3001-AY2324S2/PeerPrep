import { Processor, Process } from '@nestjs/bull';
import { InjectQueue } from "@nestjs/bull";
import { Job, Queue } from 'bull';
import { MatchingServicesService } from './matchingservices.service';
import { ExternalServicesService } from './external-services.service';

@Processor('process')
export class ProcessConsumer {
  constructor(
    @InjectQueue('process') private readonly msQueue: Queue,
    private readonly matchingServicesService: MatchingServicesService,
    private readonly externalServices: ExternalServicesService,
  ) { this.setupListeners(); }

  private setupListeners(): void {
    this.msQueue.on('completed', (job, result) => {
      console.log(`Job completed: ${job.id} with result: ${result}`);
    });

    this.msQueue.on('failed', (job, error) => {
      console.error(`Job failed: ${job.id} with error: ${error.message}`);
    });
  }

  /**
   * Handler for processing a new job in the 'process' queue.
   * @param newJob The new job to be processed.
   */
  @Process('process')
  async handleMatching(newJob: Job) {
    console.log('Processing new job for matching:', newJob.id, newJob.data);
    await this.attemptToMatchJob(newJob, 60000); // 60000 ms = 1 minute
  }

  /**
   * Attempts to find a matching job for the given job.
   * If no immediate match is found, it waits for a specified delay and tries again.
   * If no match is found after the delay, the job is marked as failed.
   * @param newJob The new job to be matched.
   * @param delay The delay in milliseconds before checking for a match again.
   */
  private async attemptToMatchJob(newJob: Job, delay: number) {
    // Initial attempt to find a matching job
    let matchingJob = await this.findMatchingJob(newJob);

    if (!matchingJob) {
      console.log(`No matching job found immediately for job ${newJob.id}. Waiting for ${delay}ms before failing.`);
      // Wait for 1 minute before checking again
      await new Promise(resolve => setTimeout(resolve, delay));

      // Attempt to find a matching job again after the delay
      matchingJob = await this.findMatchingJob(newJob);

      if (!matchingJob) {
        console.log(`No matching job found after waiting for job ${newJob.id}. Marking job as failed.`);
        // Here you could mark the job as failed if your business logic requires it
        await newJob.moveToFailed({ message: 'No matching job found within the wait period.' });
        return;
      }
    }

    const matchedQuestion = await this.externalServices.fetchQuestionByCriteria(
      matchingJob.data.category,
      matchingJob.data.difficulty
    );
    console.log('Found a matching job and a question based on criteria:', matchingJob.id, matchedQuestion.id);
    await this.matchingServicesService.pairServices(newJob.data, matchingJob.data, matchedQuestion);

    await newJob.moveToCompleted();
    await matchingJob.moveToCompleted();
    console.log('Jobs paired and removed from queue.');
  }

  /**
   * Finds a matching job for the given job based on category and difficulty.
   * @param job The job for which a matching job needs to be found.
   * @returns The matching job if found, otherwise null.
   */
  private async findMatchingJob(job: Job): Promise<Job | null> {
    const waitingJobs = await this.msQueue.getWaiting();
    return waitingJobs.find(waitingJob =>
      waitingJob.id !== job.id &&
      waitingJob.data.category === job.data.category &&
      waitingJob.data.difficulty === job.data.difficulty,
    ) || null;
  }
}
