import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) {

  }

  async encrypt(pass: any) {

    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt);

  }


  async createUser(user: CreateUserDto): Promise<User> {

    const password = this.encrypt(user.password);

    try {
      user.password = await password;
      return this.userRepository.save(user);

    } catch (error) {
      if (error.code === 1062) {
        throw new BadRequestException("Este nombre de usuario ya existe");
      }
      console.log(error);
      throw new InternalServerErrorException(`No puedes crear un nuevo usuario, check serverlog`);
    }
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
          }
        }
      );
    }
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return user;
  }

  async findOneByName(value: string): Promise<User> {

    let user = await this.userRepository.findOne({
      where: {
        username: value
      }
    });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return user;
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
