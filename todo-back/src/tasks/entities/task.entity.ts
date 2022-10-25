import {Injectable} from '@nestjs/common';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {AutoMap} from '@automapper/classes';
import {Category} from "../../category/entities/category.entity";


@Injectable()
@Entity()
export class Task {

    @AutoMap()
    @PrimaryGeneratedColumn()
    id?: number;

    @AutoMap()
    @Column()
    description: string;

    @AutoMap()
    @ManyToOne(() => User, (user) => user.tasks, {onDelete: 'CASCADE'})
    user: User | number | string;

    @ManyToOne(() => Category, (category) => category.id, {onDelete: 'CASCADE'})
    category: Category | number | string;


    //TODO modificar tiempo
    @AutoMap()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt?: Date;

    @AutoMap()
    @Column({default: false})
    isDone: boolean;

}
