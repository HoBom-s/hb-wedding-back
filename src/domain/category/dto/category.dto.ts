import { IsString, IsNumber, IsPositive, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CategoryCreateDto {
    @ApiProperty({ description: "Category's name", example: "New category" })
    @IsString({
        message: "Category name must be string !",
    })
    @IsNotEmpty({
        message: "Category name must be defined !",
    })
    readonly name: string;

    @ApiProperty({ description: "Category's path", example: "path" })
    @IsString({
        message: "Category path must be string !",
    })
    @IsNotEmpty({
        message: "Category path must be defined !",
    })
    readonly path: string;

    @ApiProperty({
        description: "Category's sort count. For Sorting.",
        example: 0,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty({ message: "Category sort count must be defined !" })
    readonly sortCount: number;
}
