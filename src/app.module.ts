import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { CardModule } from "./domain/cards/card.module";
import { UserModule } from "./domain/users/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfig,
        }),
        CardModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
