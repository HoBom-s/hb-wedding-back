import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
// import { CardsModule } from "./domain/cards/cards.module";
import { UsersModule } from "./domain/users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfig,
        }),
        // CardsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
