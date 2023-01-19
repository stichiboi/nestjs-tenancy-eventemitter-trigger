import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { JobEvent } from './job.events';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { InjectTenancyModel } from '@needle-innovision/nestjs-tenancy';

@Injectable()
export class AppService {
  constructor(
    @InjectTenancyModel(Job.name)
    private jobModel: Model<JobDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getHello(): string {
    const event = new JobEvent('some random data');
    this.eventEmitter.emit('hello.hasBeenSaid', event);
    return 'Hello World!';
  }

  @OnEvent('hello.hasBeenSaid')
  helloWasSaid(event: JobEvent) {
    console.log(`Data was: ${event.data}`);
  }
}
