import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { Repository } from "typeorm";

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

    /**
     * @Todo @robinyeon
     */
    // async createCard(cardCreateRequest) {
    //     return this.CardsRepository.save(cardCreateRequest);
    // }
}
