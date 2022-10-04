import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { USERS_SEED } from "./entities/user.entity";
import { TASK_SEED } from "./entities/task.entity";
import { TaskService } from "../tasks/task.service";

@Injectable()
export class SeedService {


  constructor(
    // injeccion
    private readonly taskService: TaskService,
    private readonly usersService: UsersService
  ) {
  }

  fillDataUsers() {
    this.usersService.fillData(USERS_SEED);
    return "Seed Users executed";
  }

  fillDataTasks() {
    this.taskService.fillData(TASK_SEED);
    return "Seed Tasks executed";
  }
}
