import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { CardDirection } from "../card.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CardUpdateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ enum: ["vertical", "horizontal"] })
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    @IsEnum(CardDirection, {
        message: "Direction should be either vertical or horizontal.",
    })
    direction: CardDirection;
}
