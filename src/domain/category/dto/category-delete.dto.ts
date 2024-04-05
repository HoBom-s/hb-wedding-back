import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CategoryDeleteDto {
    @ApiProperty({
        description: "Category id",
        example: 1,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    id: number;
}
