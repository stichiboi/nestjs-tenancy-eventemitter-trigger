import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenancyModule } from '@needle-innovision/nestjs-tenancy';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Job, JobSchema } from './job.schema';

function mongodbRootUri() {
  return 'mongodb://localhost:27017';
}

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TenancyModule.forRoot({
      tenantIdentifier: 'X-TENANT-ID',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      options: () => {},
      uri: (tenantId: string) => `${mongodbRootUri()}/${tenantId}`,
    }),
    TenancyModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
