import {Injectable} from "@nestjs/common";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Task} from "../../tasks/entities/task.entity";
import {AutoMap} from "@automapper/classes";

@Entity()
@Injectable()
export class Category {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @ManyToOne(() => User, (user) => user.categories, {onDelete: 'CASCADE'})
    user: User | number | string;

    @OneToMany(() => Task, (task) => task.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    tasks?: Task[];

}
