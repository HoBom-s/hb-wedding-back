import { IsString, IsNumber, IsPositive, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryCreateDto {
    @ApiProperty({ description: "Category's name", example: "New category" })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: "Category's path", example: "path" })
    @IsString()
    @IsNotEmpty()
    readonly path: string;

    @ApiProperty({
        description: "Category's sort count. For Sorting.",
        example: 0,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly sortCount: number;
}
