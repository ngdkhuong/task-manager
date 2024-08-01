import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDTO {
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
