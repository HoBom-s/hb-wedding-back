import { Injectable } from "@nestjs/common";
import { User } from "../entity/users.entity";
import { UserRepository } from "../repository/users.repository";
import { UserCreateDto } from "../dto/user-create.dto";
import { UserCreateResponseDto } from "../dto/user-create-response.dto";
import { BcryptHelper } from "src/helpers/bcrypt.helper";
import { UserSigninDto } from "../dto/user-signin.dto";
import { CannotFindUserException } from "../exception/cannot-find-user.exception";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(
        userCreateRequest: UserCreateDto,
    ): Promise<UserCreateResponseDto> {
        const encodedPassword: string = await BcryptHelper.encode(
            userCreateRequest.password,
        );

        const craetedUser: User = await this.userRepository.createUser({
            ...userCreateRequest,
            password: encodedPassword,
        });

        const createUserResponse: UserCreateResponseDto =
            new UserCreateResponseDto(
                craetedUser.id,
                craetedUser.email,
                craetedUser.name,
                craetedUser.nickname,
                craetedUser.phone_number,
            );

        return createUserResponse;
    }

    async signinUser(userSigninDto: UserSigninDto): Promise<string> {
        const foundUser = await this.userRepository.signinUser(userSigninDto);

        if (!foundUser) {
            throw new CannotFindUserException("Cannot find user !");
        }

        const isEqual: boolean = await BcryptHelper.decode(
            userSigninDto.password,
            foundUser.password,
        );

        if (!isEqual) {
            throw new CannotFindUserException("Cannot find user !");
        }

        return foundUser.id;
    }
}
