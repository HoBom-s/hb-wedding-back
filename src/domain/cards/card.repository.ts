import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { Repository } from "typeorm";
import { CardCreateDto } from "./dto/card-create.dto";

@Injectable()
export class CardRepository {
    constructor(
        @InjectRepository(Card)
        private readonly CardsRepository: Repository<Card>,
    ) {}

    async getOneCard(id: string) {
        await this.CardsRepository.findOneBy({ id });
    }

    async getAllCardsByUser(userId: string) {
        await this.CardsRepository.findBy({ userId });
    }

    async createCard(cardCreateRequest: CardCreateDto) {
        return this.CardsRepository.save(cardCreateRequest);
    }
}
