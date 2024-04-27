import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UserSigninDto {
    @ApiProperty({
        description: "User email",
        example: "email@gamil.com",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    )
    email: string;

    @ApiProperty({
        description: "User password",
        example: "test1234!",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/)
    password: string;
}
