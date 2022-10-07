import { Injectable } from "@nestjs/common";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";
import { JoinColumn } from "typeorm";
import {AutoMap} from "@automapper/classes";

@Injectable()
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username?: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  tasks?: Task[];

  @Column({ default: true })
  isActive?: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createAt?: Date;
}



