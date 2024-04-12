import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UserCreateDto {
    @ApiProperty({
        description: "User email",
        example: "email@gmail.com",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    )
    email: string;

    @ApiProperty({
        description: "User name",
        example: "Username",
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: "User nickname",
        example: "User nickname",
    })
    @IsString()
    @IsNotEmpty()
    nickname: string;

    @ApiProperty({
        description: "User password",
        example: "test1234!",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/)
    password: string;

    @ApiProperty({
        description: "User phone number",
        example: "010-1234-1234",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{3}-\d{3,4}-\d{4}$/)
    phoneNumber: string;
}
