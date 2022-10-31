import {Injectable} from "@nestjs/common";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Task} from "../../tasks/entities/task.entity";
import {AutoMap} from "@automapper/classes";

@Entity()
@Injectable()
export class Category {

    @AutoMap()
    @PrimaryGeneratedColumn()
    id?: number;

    @AutoMap()
    @Column()
    name?: string;

    @AutoMap()
    @ManyToOne(() => User, (user) => user.categories, {onDelete: 'CASCADE'})
    user: User | number | string;

    @AutoMap()
    @OneToMany(() => Task, (task) => task.category, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    tasks?: Task[];


}
