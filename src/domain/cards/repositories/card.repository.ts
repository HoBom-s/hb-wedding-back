import { Injectable } from "@nestjs/common";
import { Card } from "../card.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { CardCreateDto } from "../dtos/card-create.dto";
import { CardUpdateDto } from "../dtos/card-update.dto";
import { CardCustomRepository } from "./card-custom.repository";

@Injectable()
export class CardRepository extends CardCustomRepository {
    async getAllCardsByUser(userId: string): Promise<Card[]> {
        return this.card.findBy({ user: { id: userId } });
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
