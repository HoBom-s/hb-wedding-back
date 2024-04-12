import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/users.entity";
import { UserRepository } from "./repository/users.repository";
import { UserService } from "./service/users.service";
import { UserController } from "./controller/users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserRepository, UserService],
    controllers: [UserController],
})
export class UsersModule {}
