import { Injectable } from "@nestjs/common";
import { CardRepository } from "./card.repository";
import { Card } from "./card.entity";
import { CardCreateDto } from "./dto/card-create.dto";
import { CardUpdateDto } from "./dto/card-update.dto";
import { DeleteResult } from "typeorm";

@Injectable()
export class CardService {
    constructor(private readonly cardRepository: CardRepository) {}

    async getAllCardsByUser(userId: string): Promise<Card[]> {
        return this.cardRepository.getAllCardsByUser(userId);
    }

    async getOneCardById(id: string): Promise<Card> {
        const foundCard = await this.cardRepository.getOneCardById(id);

        if (!foundCard) throw new Error("Card not found");

        return foundCard;
    }

    async createCard(cardCreateRequest: CardCreateDto): Promise<Card> {
        return this.cardRepository.createCard(cardCreateRequest);
    }

    async updateCard(id: string, cardUpdateDto: CardUpdateDto): Promise<Card> {
        await this.cardRepository.updateCard(id, cardUpdateDto);

        const updatedCard = await this.getOneCardById(id);

        return updatedCard;
    }

    async removeCard(id: string): Promise<DeleteResult> {
        return this.cardRepository.removeCard(id);
    }
}
