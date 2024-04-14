import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CardCreateDto } from "./dto/card-create.dto";
import { CardUpdateDto } from "./dto/card-update.dto";

@Injectable()
export class CardRepository {
    constructor(
        @InjectRepository(Card)
        private readonly card: Repository<Card>,
    ) {}

    async getOneCard(id: string): Promise<Card> {
        return this.card.findOneBy({ id });
    }

    async getAllCardsByUser(userId: string): Promise<Card[]> {
        return this.card.findBy({ userId });
    }

    async createCard(cardCreateRequest: CardCreateDto): Promise<Card> {
        return this.card.save(cardCreateRequest);
    }

    async updateCard(
        id: string,
        cardUpdateDto: CardUpdateDto,
    ): Promise<UpdateResult> {
        return this.card.update(id, cardUpdateDto);
    }

    async removeCard(id: string): Promise<DeleteResult> {
        return this.card.delete(id);
    }
}
