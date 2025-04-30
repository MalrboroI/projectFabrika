import { Module } from '@nestjs/common';
import { TasksController } from './components/tasks.controller';

@Module({
  controllers: [TasksController],
})
export class AppModule {}
