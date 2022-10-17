import { AutoMap } from '@automapper/classes';

export class ReadTaskDto {
  @AutoMap()
  id!: number;

  @AutoMap()
  description!: string;

  @AutoMap()
  userId!: number;
}
