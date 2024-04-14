import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CardCreateDto } from "./dto/card-create.dto";
import { Card } from "./card.entity";
import { CardUpdateDto } from "./dto/card-update.dto";

@Controller("/api/v1/cards")
export class CardController {
    constructor(private readonly cardService: CardService) {}

    /**
     * @Todo @robinyeon
     * - token 적용 후 userId 가져오기
     */
    /*
    @Get("/")
    async getAllCardsByUser() {}

    @Get("/:id")
    async getOneCardById(@Param("id") id: string): Promise<Card> {
        const foundCard = await this.cardService.getOneCardById(id);

        return foundCard;
    }

    @Post("/")
    async createCard(
        @Param("id") id: string,
        @Body() cardCreateRequest: CardCreateDto,
    ): Promise<Card> {}

    @Patch("/:id")
    async updateCard(
        @Param("id") id: string,
        @Body() cardUpdateRequest: CardUpdateDto,
    ): Promise<Card> {}

    @Delete("/:id")
    async removeCard(@Param("id") id: string) {}
    */
}
