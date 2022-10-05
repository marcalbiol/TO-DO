import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { UsersModule } from "../users/users.module";
import { TaskModule } from "../tasks/task.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [TaskModule, UsersModule]
})
export class SeedModule {
}
