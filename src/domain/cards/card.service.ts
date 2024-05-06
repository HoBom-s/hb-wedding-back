import { Injectable } from "@nestjs/common";
import { CardRepository } from "./repositories/card.repository";
import { Card } from "./card.entity";
import { CardCreateDto } from "./dtos/card-create.dto";
import { CardUpdateDto } from "./dtos/card-update.dto";
import { DeleteResult } from "typeorm";
import { CannotFindCardException } from "./exceptions/cannot-find-card.exception";
import { AlreadyExistCardException } from "./exceptions/already-exist-card.exception";
import { UserService } from "../users/service/user.service";
import { InvalidAccessToCardException } from "./exceptions/invalid-access-to-card.exception";

@Injectable()
export class CardService {
    constructor(
        private readonly cardRepository: CardRepository,
        private readonly userService: UserService,
    ) {}

    async getAllCardsByUser(userId: string) {
        const foundCards = await this.cardRepository.getAllCardsByUser(userId);

        return foundCards;
    }

    async getOneCardById(id: string): Promise<Card> {
        const foundCard = await this.cardRepository.getOneCardBy("id", id);

        if (!foundCard) throw new CannotFindCardException();

        return foundCard;
    }

    async createCard(userId, cardCreateRequest: CardCreateDto): Promise<Card> {
        const foundCard = await this.cardRepository.getOneCardBy(
            "title",
            cardCreateRequest.title,
        );

        if (foundCard) throw new AlreadyExistCardException();

        const foundUser = await this.userService.findOneUserById(userId);

        return this.cardRepository.createCard(cardCreateRequest, foundUser);
    }

    async updateCard(
        id: string,
        cardUpdateDto: CardUpdateDto,
        userId: string,
    ): Promise<Card> {
        await this.validateUser(id, userId);

        const [_, updatedCard] = await Promise.all([
            this.cardRepository.updateCard(id, cardUpdateDto),
            this.getOneCardById(id),
        ]);
        return updatedCard;
    }

    async removeCard(id: string, userId: string): Promise<DeleteResult> {
        await this.validateUser(id, userId);
        return this.cardRepository.removeCard(id);
    }

    async validateUser(cardId: string, userId: string) {
        const foundCard = await this.getOneCardById(cardId);
        if (foundCard.user.id !== userId)
            throw new InvalidAccessToCardException();
        return;
    }
}
