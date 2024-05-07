import { DeleteResult } from "typeorm";
import { Card } from "../entities/card.entity";
import { CardCreateDto } from "../dtos/card-create.dto";
import { CardUpdateDto } from "../dtos/card-update.dto";

export interface CardBaseService {
    getAllCardsByUser(userId: string): Promise<Card[]>;
    getOneCardById(id: string): Promise<Card>;
    createCard(userId: string, cardCreateRequest: CardCreateDto): Promise<Card>;
    updateCard(
        id: string,
        cardUpdateDto: CardUpdateDto,
        userId: string,
    ): Promise<Card>;
    removeCard(id: string, userId: string): Promise<DeleteResult>;
    validateUser(id: string, userId: string): Promise<Card>;
}

export const CardBaseService = Symbol("CardBaseService");
