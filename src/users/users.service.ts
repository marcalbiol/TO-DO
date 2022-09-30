import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {


  private users: User[];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {

  }

  createUser(user: CreateUserDto): Promise<User> {

    try {
      user.password = this.encryptPw(user.password);
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


  async findOneById(value: any): Promise<User> {

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

  //TODO CREAR UNA CLASE A PARTE PARA ESTAS 2 FUNCIONES
  // metodo para encryptar pw
  encryptPw(value: string) {
    const crypto = require("crypto");
    const ENC = "bf3c199c2470cb477d907b1e0917c17b";
    const IV = "5183666c72eec9e4";
    const ALGO = "aes-256-cbc";

    let cipher = crypto.createCipheriv(ALGO, ENC, IV);
    let encrypted = cipher.update(value, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  }

  decryptPw(value: string) {
    const crypto = require("crypto");
    const ENC = "bf3c199c2470cb477d907b1e0917c17b";
    const IV = "5183666c72eec9e4";
    const ALGO = "aes-256-cbc";

    let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
    let decrypted = decipher.update(value, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  }

}
