import {Injectable} from '@nestjs/common';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {AutoMap} from '@automapper/classes';

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
    user: User | number;

    @AutoMap()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt?: Date;


}
