import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { JwtModule } from "@nestjs/jwt";
import { GLOBAL_ENV } from "src/config/global.env.config";
import { UserBaseService } from "./services/user-base.service";
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
