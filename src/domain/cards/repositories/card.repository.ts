import { Injectable } from "@nestjs/common";
import { Card } from "../entities/card.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CardCreateDto } from "../dtos/card-create.dto";
import { CardUpdateDto } from "../dtos/card-update.dto";
import { User } from "src/domain/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CardBaseRepository } from "./card-base.repository";
import { Columns, Values } from "../../../types/common.type";

@Injectable()
export class CardRepository implements CardBaseRepository {
    constructor(
        @InjectRepository(Card) private readonly card: Repository<Card>,
    ) {}

    async getAllCardsByUser(userId: string): Promise<Card[]> {
        return this.card.findBy({
            user: { id: userId },
        });
    }

    async createCard(
        cardCreateRequest: CardCreateDto,
        foundUser: User,
    ): Promise<Card> {
        return this.card.save({ ...cardCreateRequest, user: foundUser });
    }

    async updateCard(
        id: string,
        cardUpdateDto: CardUpdateDto,
    ): Promise<UpdateResult> {
        return this.card.update(id, cardUpdateDto);
    }

    async removeCard(id: string): Promise<DeleteResult> {
        return this.card.softDelete(id);
    }

    async getOneCardBy(
        column: Columns<Card>,
        value: Values<Card>,
    ): Promise<Card> {
        return this.card.findOneBy({ [column]: value });
    }
}
