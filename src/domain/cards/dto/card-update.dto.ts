import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { CardDirection } from "../card.entity";

export class CardUpdateDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    @IsEnum(CardDirection, {
        message: "Direction should be either vertical or horizontal.",
    })
    direction: CardDirection;
}
