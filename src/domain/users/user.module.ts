import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { GLOBAL_ENV } from "src/config/global.env.config";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: GLOBAL_ENV.JWT_SECRET,
            signOptions: { expiresIn: "60s" },
        }),
    ],
    providers: [UserRepository, UserService],
    controllers: [UserController],
    exports: [UserRepository, UserService],
})
export class UserModule {}
