import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Transform } from "class-transformer";
import { CardDirection } from "../card.entity";

export class CardCreateDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    @IsEnum(CardDirection, {
        message: "Direction should be either vertical or horizontal.",
    })
    direction: CardDirection.HORIZONTAL | CardDirection.VERTICAL;
}
