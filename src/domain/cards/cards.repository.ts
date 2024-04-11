import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./cards.entity";
import { Repository } from "typeorm";

@Injectable()
export class CardsRepository {
    constructor(
        @InjectRepository(Card)
        private readonly CardsRepository: Repository<Card>,
    ) {}

    async getOneCard(id: string) {
        await this.CardsRepository.findOneBy({ id });
    }
}
