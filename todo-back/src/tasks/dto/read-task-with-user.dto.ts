import { AutoMap } from '@automapper/classes';
import { User } from '../../users/entities/user.entity';
import { ReadTaskDto } from './read-task.dto';

export class ReadTaskWithUserDto extends ReadTaskDto {
  @AutoMap()
  user!: User[];
}
