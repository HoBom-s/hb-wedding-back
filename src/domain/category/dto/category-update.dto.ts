import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CategoryUpdateDto {
    @ApiProperty({
        description: "Category's name",
        example: "Updated category",
    })
    @IsOptional()
    @IsString()
    readonly name?: string;

    @ApiProperty({
        description: "Category's path",
        example: "path01",
    })
    @IsOptional()
    @IsString()
    readonly path?: string;

    @ApiProperty({
        description: "Category's sort count",
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    readonly sortCount?: number;
}
