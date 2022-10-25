import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {Category} from "./entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateTaskDto} from "../tasks/dto/create-task.dto";
import {Task} from "../tasks/entities/task.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
    }

    create(createCategoryDto: CreateCategoryDto, userId: number): Promise<Category> {
        createCategoryDto.user = userId
        return this.categoryRepository.save(createCategoryDto);
    }

    async findCategory(id: number): Promise<boolean> {
        console.log(id + "id de findcaT")
        let bool;
        bool = await this.categoryRepository.findOne({
            where: {
                id: id,
            }
        })
        if (bool) return true
        return false
    }


    async newTask(task: CreateTaskDto, catId: number): Promise<Task> {
        const categoryId = catId;

        let categoryExists = await this.findCategory(categoryId)

        if (categoryExists) {
            task.category = categoryId
            return await this.taskRepository.save(task);
        }
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {

        return this.categoryRepository.update(id, updateCategoryDto)
        //TODO response
    }

    remove(id: number) {

        return this.categoryRepository.delete(id)
        //TODO response
    }

}
