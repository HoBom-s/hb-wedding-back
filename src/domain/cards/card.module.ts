import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { CardRepository } from "./card.repository";
import { UserModule } from "../users/user.module";

@Module({
    imports: [TypeOrmModule.forFeature([Card]), UserModule],
    providers: [CardRepository],
    controllers: [],
})
export class CardModule {}
