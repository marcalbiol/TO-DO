import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import {Category} from "../entities/category.entity";

export class UpdateCategoryDto {

    name?: string;
}