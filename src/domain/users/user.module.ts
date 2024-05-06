import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { GLOBAL_ENV } from "src/config/global.env.config";
import { UserBaseService } from "./service/user-base.service";
import { UserBaseRepository } from "./repositories/user-base.repository";
import { RedisHelper } from "src/helpers/redis.helper";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: GLOBAL_ENV.JWT_SECRET,
        }),
    ],
    providers: [
        {
            provide: UserBaseRepository,
            useClass: UserRepository,
        },
        {
            provide: UserBaseService,
            useClass: UserService,
        },
        RedisHelper,
    ],
    controllers: [UserController],
    exports: [UserBaseRepository, UserBaseService],
})
export class UserModule {}
