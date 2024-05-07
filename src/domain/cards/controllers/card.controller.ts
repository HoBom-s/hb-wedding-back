import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    Request,
} from "@nestjs/common";
import { CardService } from "../services/card.service";
import { CardCreateDto } from "../dtos/card-create.dto";
import { Card } from "../entities/card.entity";
import { CardUpdateDto } from "../dtos/card-update.dto";
import {
    ApiBody,
    ApiCreatedResponse,
    ApiFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";

@ApiTags("Card API")
@Controller("/api/v1/cards")
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(AuthGuard)
    @Get("/")
    async getAllCardsByUser(@Request() req): Promise<Card[]> {
        const userId = req.user;

        const foundCards = await this.cardService.getAllCardsByUser(userId);

        return foundCards;
    }

    @Get("/:id")
    @ApiOperation({ summary: "Get one card by cardID." })
    @ApiParam({ name: "id" })
    @ApiFoundResponse({ description: "One card successfully found." })
    async getOneCardById(@Param("id") id: string): Promise<Card> {
        const foundCard = await this.cardService.getOneCardById(id);

        return foundCard;
    }

    @UseGuards(AuthGuard)
    @Post("/")
    @ApiOperation({ summary: "Create new card." })
    @ApiBody({ type: CardCreateDto })
    @ApiCreatedResponse({
        description: "The card has been successfully created.",
        type: Card,
    })
    async createCard(
        @Request() req,
        @Body() cardCreateRequest: CardCreateDto,
    ): Promise<Card> {
        const userId = req.user;
        const createdCard = await this.cardService.createCard(
            userId,
            cardCreateRequest,
        );
        return createdCard;
    }

    @UseGuards(AuthGuard)
    @Patch("/:id")
    @ApiOperation({ summary: "Update the card." })
    @ApiParam({ name: "id" })
    @ApiBody({ type: CardUpdateDto })
    @ApiOkResponse({
        description: "The card has been successfully updated.",
        type: Card,
    })
    async updateCard(
        @Request() req,
        @Param("id") id: string,
        @Body() cardUpdateRequest: CardUpdateDto,
    ): Promise<Card> {
        const userId = req.user;
        const updatedCard = await this.cardService.updateCard(
            id,
            cardUpdateRequest,
            userId,
        );
        return updatedCard;
    }

    @UseGuards(AuthGuard)
    @Delete("/:id")
    @ApiOperation({ summary: "Delete the card." })
    @ApiParam({ name: "id" })
    @ApiOkResponse({
        description: "The card has been successfully deleted.",
    })
    async removeCard(@Request() req, @Param("id") id: string) {
        const userId = req.user;
        await this.cardService.removeCard(id, userId);
        return { message: "Card successfully deleted." };
    }
}
