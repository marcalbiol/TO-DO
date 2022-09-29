import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class TaskService {

  private task: Task[] = []
  
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private DataSource: DataSource
  ){

  }
  create(createCuentaDto: CreateTaskDto) {
    return 'This action adds a new cuenta';
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {

    let cuenta: any

    cuenta = await this.taskRepository.findOne({
      where: {
        id: id
      }
    });
    if(!cuenta) throw new NotFoundException("cuenta no encontrada")

    return cuenta;
  }

  findOneSalary(id: number){

    const salary =  this.DataSource
    .getRepository(Task)
    .createQueryBuilder("cuenta")
    .select("cuenta.saldo")
    .where("cuenta.id = :id", {id: id})
    .getOne()
      
    return salary;
  }

  async update(id: number, cuenta: Task) {

    const taskExists = await this.findOne(id)

    let cuentaUpd: any;

    cuentaUpd = this.taskRepository.update(id, cuenta)
   
    return cuentaUpd;
    }
  

    /*
  sendMoney(id: number, cuenta: Cuenta, value: number){
    // al enviar se resta el actual cuenta
    cuenta.saldo = cuenta.saldo -= value;
    console.log(cuenta.saldo)
    return this.taskRepository.update(id, cuenta)
  }

     */
 
  
  remove(id: number) { /*
    const{deleted Count}=await this.pokemonModel.de leteOne _id:id});
    if(deletedCount ===0)
      throw new Bad RequestException(`Pokemon with id"${id}"not found`);
    return;
    */
  }

  fillData(cuenta: Task[]){
    this.taskRepository.save(cuenta)
  }

  private handleError(error: any){
    
    if(error === 1300){
      // codigo thor new... luego se llama al metodo privado dentro del 
      //catch con el parametro del error
    }
  }

}
