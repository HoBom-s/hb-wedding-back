import { Injectable } from "@nestjs/common";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";
import { UserCreateDto } from "../dtos/user-create.dto";
import { UserCreateResponseDto } from "../dtos/user-create-response.dto";
import { BcryptHelper } from "src/helpers/bcrypt.helper";
import { UserSigninDto } from "../dtos/user-signin.dto";
import { CannotFindUserException } from "../exceptions/cannot-find-user.exception";
import { AlreadyExistUserException } from "../exceptions/already-exist-user.exception";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(
        userCreateRequest: UserCreateDto,
    ): Promise<UserCreateResponseDto> {
        const alreadyFoundUser: User = await this.userRepository.findByEmail(
            userCreateRequest.email,
        );

        if (alreadyFoundUser) {
            throw new AlreadyExistUserException();
        }

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
                craetedUser.phoneNumber,
            );

        return createUserResponse;
    }

    async signinUser(userSigninDto: UserSigninDto): Promise<string> {
        const foundUser = await this.userRepository.findByEmail(
            userSigninDto.email,
        );

        if (!foundUser) {
            throw new CannotFindUserException();
        }

        const isEqual: boolean = await BcryptHelper.decode(
            userSigninDto.password,
            foundUser.password,
        );

        if (!isEqual) {
            throw new CannotFindUserException();
        }

        return foundUser.email;
    }
}
