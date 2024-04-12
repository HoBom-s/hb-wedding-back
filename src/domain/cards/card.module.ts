import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { CardRepository } from "./card.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Card])],
    providers: [CardRepository],
    controllers: [],
})
export class CardModule {}
