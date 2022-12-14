import {Injectable} from '@nestjs/common';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Task} from '../../tasks/entities/task.entity';
import {AutoMap} from '@automapper/classes';
import {Category} from "../../category/entities/category.entity";

@Injectable()
@Entity()
export class User {

    @AutoMap()
    @PrimaryGeneratedColumn()
    id?: number;

    @AutoMap()
    @Column()
    username?: string;

    @AutoMap()
    @Column()
    password?: string;

    @OneToMany(() => Task, (task) => task.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    tasks?: Task[];

    @AutoMap()
    @OneToMany(() => Category, (category) => category.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    categories?: Category[];

    @AutoMap()
    @Column({default: true})
    isActive?: boolean;

    @AutoMap()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt?: Date;
}
