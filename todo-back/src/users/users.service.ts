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


    //TODO NO REPETIR CODIGO

    async encrypt(pass: any) {

        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }

    async createUser(user: CreateUserDto): Promise<ReadUserDto> {
        const {username} = user;

        const userInDb = await this.userRepository.findOne({
            where: {username}
        })

        if (userInDb) throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);

        try {
            const pass = this.encrypt(user.password);
            user.password = await pass;
            const entity = this.classMapper.map(user, CreateUserDto, User)
            return this.classMapper.mapAsync(await this.userRepository.save(entity), User, ReadUserDto)
        } catch (ex) {
            throw new Error(`error: ${ex.message}.`);
        }
    }

    async findAll(): Promise<ReadUserDto[]> {

        try {
            return this.classMapper.mapArrayAsync(await this.userRepository.find({relations: ['tasks']}), User, ReadUserDto)
        } catch (ex) {
            throw new Error(`error: ${ex.message}.`);
        }
    }

    async findOneByName(name: string) {

        let user: any
        user = await this.userRepository.findOne({
            where: {
                username: name
            },
            relations: ['categories']
        })
        if (!user) throw new NotFoundException("Usuario no encontrado");
        return this.classMapper.mapAsync(await user, User, ReadUserDto);
    }


    // TODO buscar id y nombre en la misma funcion, depende de si es number o no.
    async findOneById(value: number) {

        let user: any
        // id
        if (!isNaN(value)) {
            user = await this.userRepository.findOne({
                    where: {
                        id: value
                    },
                    relations: ['categories']
                }
            );
        }
        if (!user) throw new NotFoundException("Usuario no encontrado");
        return this.classMapper.mapAsync(await user, User, ReadUserDto);
    }

    async findOne(value: object): Promise<User> {

        return await this.userRepository.findOne(value);
    }

    async findByPayload(username: any): Promise<User> {
        return await this.findOne({where: {username}})
    }


    async update(id: number, updateUser: UpdateUserDto) {
        // find user by id
        const userInDb = await this.userRepository.findOne({
            where: {id}
        })

        let pass = this.encrypt(updateUser.password); // encrypta la nueva password
        userInDb.password = await pass;

        return this.userRepository.save(userInDb);
    }

    async remove(id: number) {

        return await this.userRepository.delete(id);
    }

    fillData(user: User[]) {

        this.userRepository.save(user);
    }


}
