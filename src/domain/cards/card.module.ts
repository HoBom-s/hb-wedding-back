import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { CardRepository } from "./repositories/card.repository";
import { UserModule } from "../users/user.module";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { UserService } from "../users/service/user.service";
import { RedisHelper } from "src/helpers/redis.helper";

@Module({
    imports: [TypeOrmModule.forFeature([Card]), UserModule],
    providers: [CardService, CardRepository, UserService, RedisHelper],
    controllers: [CardController],
})
export class CardModule {}
