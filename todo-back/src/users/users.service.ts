import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {ReadUserDto} from "./dto/read-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectMapper()
        private readonly classMapper: Mapper
    ) {
    }

    async encrypt(pass: any) {

        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }

    async createUser(user: CreateUserDto): Promise<ReadUserDto> {
        const {username} = user;

        const userInDb = await this.userRepository.findOne({
            where: {username}
        })

        if (userInDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

        try {
            const pass = this.encrypt(user.password);
            user.password = await pass;
            const entity = this.classMapper.map(user, CreateUserDto, User)
            return this.classMapper.mapAsync(await this.userRepository.save(entity), User, ReadUserDto)
        } catch (ex) {
            throw new Error(`create error: ${ex.message}.`);
        }


    }

    async findAll(): Promise<ReadUserDto[]> {

        try {
            return this.classMapper.mapArrayAsync(await this.userRepository.find(), User, ReadUserDto)
        } catch (ex) {
            throw new Error(`findAll error: ${ex.message}.`);
        }
    }


    async findOneById(value: number): Promise<User> {

        //TODO automapper
        let user: any;

        // id
        if (!isNaN(value)) {
            user = await this.userRepository.findOne({
                    where: {
                        id: value
                    },
                    relations: ['tasks']
                }
            );
        }
        if (!user) throw new NotFoundException("Usuario no encontrado");
        return user;
    }

    async findOne(value: object): Promise<User> {

        return await this.userRepository.findOne(value);

    }

    async findByPayload(username: any): Promise<User> {
        return await this.findOne({where: {username}})
    }


    update(id: number, updateClienteDto: UpdateUserDto) {
        //TODO cambiar password automapper
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {

        return await this.userRepository.delete(id);
    }

    fillData(user: User[]) {

        this.userRepository.save(user);
    }


}
