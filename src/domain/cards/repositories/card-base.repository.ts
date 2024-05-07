import { User } from "@sentry/node";
import { CardCreateDto } from "../dtos/card-create.dto";
import { Card } from "../entities/card.entity";
import { CardUpdateDto } from "../dtos/card-update.dto";
import { DeleteResult, UpdateResult } from "typeorm";

export interface CardBaseRepository {
    getAllCardsByUser(userId: string): Promise<Card[]>;
    createCard(
        cardCreateRequest: CardCreateDto,
        foundUser: User,
    ): Promise<Card>;
    updateCard(id: string, cardUpdateDto: CardUpdateDto): Promise<UpdateResult>;
    removeCard(id: string): Promise<DeleteResult>;
}

export const CardBaseRepository = Symbol("CardBaseRepository");
