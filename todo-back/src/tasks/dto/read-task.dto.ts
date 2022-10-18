import {AutoMap} from '@automapper/classes';


export class ReadTaskDto {

    @AutoMap()
    readonly id!: number;

    @AutoMap()
    readonly description!: string;

    @AutoMap()
    readonly createAt: Date;


}
