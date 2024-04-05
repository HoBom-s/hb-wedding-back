import { IsString, IsNumber, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryCreateDto {
    @ApiProperty({ description: "Category's name", example: "New category" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Category's path", example: "path" })
    @IsString()
    path: string;

    @ApiProperty({
        description: "Category's sort count. For Sorting.",
        example: 0,
    })
    @IsNumber()
    @IsPositive()
    sortCount: number;
}
