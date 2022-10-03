import { Injectable } from "@nestjs/common";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Injectable()
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks, {onDelete: 'CASCADE'})
  user: number;
}
