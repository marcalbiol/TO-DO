import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { query } from 'express';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {

  private cliente: User[]

  constructor(
    @InjectRepository(User)
    private clienteRepository: Repository<User>
  ){}

  createCliente(cliente: CreateUserDto): Promise<User>{

    try{
      return this.clienteRepository.save(cliente);

    }catch(error){
      if(error.code === 1062){
        throw new BadRequestException('Telefono duplicado')
      }
      console.log(error);
      throw new InternalServerErrorException(`No puedes crear un nuevo cliente, check serverlog`)
    }
  }
    
  async findAll(): Promise<User[]>{
  
    return await this.clienteRepository.find()
  }

 async findOneById(value: any): Promise<User> {

      let client: any

      // id
      if(!isNaN(value)){
          client = await this.clienteRepository.findOne({
      where: {
        id: value
      }
     });
    }


    if(!client) throw new NotFoundException("Cliente no encontrado");
  
   return client;
}

  update(id: number, updateClienteDto: UpdateUserDto) {
    return `This action updates a #${id} cliente`;
  }

  async remove(id: number) {
  return await this.clienteRepository.delete(id)
  }

  fillData(cliente: User[]){
    this.clienteRepository.save(cliente);
  }
}
