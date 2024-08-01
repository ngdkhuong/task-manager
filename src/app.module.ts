import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ,
    TasksModule,
  ],
})
export class AppModule {}
