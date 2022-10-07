import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";
import {UserDto} from "./dto/login-user.dto";
import {InjectMapper} from "@automapper/nestjs";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        ) {

    }

    async encrypt(pass: any) {

        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }

    async createUser(user: CreateUserDto): Promise<UserDto> {
        const {username} = user;

        const userInDb = await this.userRepository.findOne({
            where: {username}
        })

        if (userInDb) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

        const pass = this.encrypt(user.password);
        user.password = await pass;
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {

        return await this.userRepository.find();
    }


    async findOneById(value: number): Promise<User> {

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
        //TODO cambiar password
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {

        return await this.userRepository.delete(id);
    }

    fillData(user: User[]) {

        this.userRepository.save(user);
    }


}
