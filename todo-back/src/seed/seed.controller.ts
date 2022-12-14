import {Controller, Get} from "@nestjs/common";
import {SeedService} from "./seed.service";

@Controller("seed")
export class SeedController {
    constructor(private readonly seedService: SeedService) {
    }


    @Get("/users")
    fillUsers() {
        return this.seedService.fillDataUsers();
    }

    @Get("/tareas")
    fillTasks() {
        return this.seedService.fillDataTasks();
    }
}
