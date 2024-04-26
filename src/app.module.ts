import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { CardModule } from "./domain/cards/card.module";
import { UserModule } from "./domain/users/user.module";
import { CacheModule } from "@nestjs/cache-manager";
import type { RedisClientOptions } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { GLOBAL_ENV } from "./config/global.env.config";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfig,
        }),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            host: GLOBAL_ENV.REDIS_HOST,
            port: GLOBAL_ENV.REDIS_PORT,
        }),
        CardModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
