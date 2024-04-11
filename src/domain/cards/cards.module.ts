import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./cards.entity";
import { CardsRepository } from "./cards.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Card])],
    providers: [],
    controllers: [CardsRepository],
})
export class CardsModule {}
