import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserRepository, UserService],
    controllers: [UserController],
})
export class UserModule {}
